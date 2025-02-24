import { BadRequestException, Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { CredentialRepository } from "./credential.repository";
import { CreateCredentialDto } from "./dtos/create-credential.dto";
import { UpdateCredentialDto } from "./dtos/update-credential.dto";

@Injectable()
export class CredentialService {
  constructor(private readonly credentialRepository: CredentialRepository) {}

  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(process.env.ENCRYPTION_KEY, "hex"), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }

  private decrypt(text: string): string {
    const [ivHex, encryptedHex] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(process.env.ENCRYPTION_KEY, "hex"), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  async getCredentialByProvider(provider: string) {
    const credential = await this.credentialRepository.findByProvider(provider);
    if (!credential) {
      throw new BadRequestException(`Credential for ${provider} not found`);
    }
    if (credential.client_secret && credential.client_secret.includes(":")) {
      credential.client_secret = this.decrypt(credential.client_secret);
    }
    return credential;
  }

  async getClientIdByProvider(provider: string) {
    const credential = await this.credentialRepository.findByProvider(provider);
    if (!credential) {
      return process.env.FORTY_TWO_UID;
    }
    return credential.client_id;
  }

  async getClientSecretByProvider(provider: string) {
    const credential = await this.credentialRepository.findByProvider(provider);
    if (!credential) {
      return process.env.FORTY_TWO_SECRET;
    }
    return this.decrypt(credential.client_secret);
  }

  async createCredential(createCredentialDto: CreateCredentialDto) {
    const { provider, client_id, client_secret } = createCredentialDto;
    if (await this.credentialRepository.findByProvider(provider)) {
      throw new BadRequestException(`Credential for ${provider} already exists`);
    }
    const encryptedSecret = this.encrypt(client_secret);
    this.credentialRepository.save(provider, client_id, encryptedSecret);
    return { message: "Credential created successfully" };
  }

  async updateCredential(id: number, updateCredentialDto: UpdateCredentialDto) {
    if (!(await this.credentialRepository.findById(id))) {
      throw new BadRequestException(`Credential with id ${id} not found`);
    }
    const { client_id, client_secret } = updateCredentialDto;
    if (client_id) {
      await this.credentialRepository.updateField(id, "client_id", client_id);
    }
    if (client_secret) {
      const encryptedSecret = this.encrypt(client_secret);
      await this.credentialRepository.updateField(id, "client_secret", encryptedSecret);
    }
    return { message: "Credential updated successfully" };
  }
}
