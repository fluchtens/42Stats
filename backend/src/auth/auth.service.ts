import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseService } from 'src/core/database/database.service';
import { User } from 'src/user/types/user.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
  ) {}

  async validateUser(profile: any): Promise<User> {
    const { id, login, email, image, cursus_users, campus_users } =
      profile._json;

    const commonCoreCursus = cursus_users.find(
      (cursus) => cursus.cursus_id === 21,
    );

    const primaryCampus = campus_users.find(
      (campus) => campus.is_primary === true,
    );

    const user: User = {
      id,
      login,
      email,
      image: image?.link,
      level: commonCoreCursus?.level ?? 0,
      campus_id: primaryCampus?.campus_id ?? null,
    };

    const existingUser = await this.userService.getUserById(id);
    if (!existingUser) {
      await this.userService.createUser(user);
      return user;
    }
    return existingUser;
  }

  async fortyTwoAuth(req: Request, res: Response) {
    const user = req.user as User;
    if (user && user.id) {
      req.session.user = {
        id: user.id,
      };
    }
    return res.redirect(process.env.CLIENT_URL);
  }

  async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        res.status(200).send('Logout successful');
      }
    });
  }
}
