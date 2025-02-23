import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { AccountRepository } from "src/account/account.repository";
import { Account } from "src/account/types/account.type";
import { CredentialService } from "src/credential/credential.service";
import { RoleRepository } from "src/role/role.repository";
import { UAParser } from "ua-parser-js";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly roleRepository: RoleRepository,
    private readonly credentialService: CredentialService
  ) {}

  private async fetchAccessToken(code: string): Promise<string> {
    try {
      const response = await fetch("https://api.intra.42.fr/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: await this.credentialService.getClientIdByProvider("42"),
          client_secret: await this.credentialService.getClientSecretByProvider("42"),
          code: code,
          redirect_uri: process.env.VITE_API_URL + "/auth/42/callback"
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error_description);
      }

      return data.access_token;
    } catch (error: any) {
      this.logger.error("fetchAccessToken() " + error.message);
      return null;
    }
  }

  private async getUserProfile(accessToken: string): Promise<any> {
    try {
      const response = await fetch(`https://api.intra.42.fr/v2/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(response);
        throw new Error(data.error);
      }
      return data;
    } catch (error: any) {
      this.logger.error("getUserProfile() " + error.message);
      return null;
    }
  }

  private async validateUser(profile: any): Promise<Account> {
    const { id, login, email, image, cursus_users, campus_users } = profile;

    const commonCoreCursus = cursus_users.find((cursus) => cursus.cursus_id === 21);

    const primaryCampus = campus_users.find((campus) => campus.is_primary === true);

    const account: Account = {
      id,
      login,
      email,
      image: image?.link,
      level: commonCoreCursus?.level ?? 0,
      campus_id: primaryCampus?.campus_id ?? null
    };

    const existingAccount = await this.accountRepository.findById(id);
    if (!existingAccount) {
      await this.accountRepository.save(account);
    } else {
      await this.accountRepository.update(account);
    }
    return account;
  }

  private async saveSession(req: Request, account: Account) {
    req.session.user = {
      id: account.id,
      roles: await this.roleRepository.findByAccountId(account.id)
    };
    const ua = new UAParser(req.headers["user-agent"] || "").getResult();
    req.session.deviceInfo = {
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown",
      browser: ua.browser.name || "Unknown",
      os: ua.os.name || "Unknown",
      device: ua.device.model || ua.device.type || "Unknown"
    };
  }

  async redirectTo42(res: Response) {
    const clientId = await this.credentialService.getClientIdByProvider("42");
    const redirectUri = encodeURIComponent(process.env.VITE_API_URL + "/auth/42/callback");
    const authUrl = `https://api.intra.42.fr/oauth/authorize?response_type=code&redirect_uri=${redirectUri}&scope=public&client_id=${clientId}`;
    return res.redirect(authUrl);
  }

  async loginWith42(code: string, req: Request, res: Response) {
    const accessToken = await this.fetchAccessToken(code);
    if (!accessToken) {
      throw new BadRequestException("Unable to fetch access token");
    }
    const user = await this.getUserProfile(accessToken);
    if (!user) {
      throw new BadRequestException("Unable to fetch user profile");
    }
    const account: Account = await this.validateUser(user);
    if (!account) {
      throw new BadRequestException("Unable to validate your account");
    }
    await this.saveSession(req, account);
    return res.redirect(process.env.CLIENT_URL);
  }

  async logout(req: Request) {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(new BadRequestException("Unable to log out"));
        } else {
          resolve();
        }
      });
    });
    return { message: "Logged out successfully" };
  }
}
