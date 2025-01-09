import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { User } from 'src/user/types/user.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
  ) {}

  async validateUser(profile: any): Promise<void> {
    const commonCoreCursus = profile._json.cursus_users.find(
      (cursus) => cursus.cursus_id === 21,
    );

    const primaryCampus = profile._json.campus_users.find(
      (campus) => campus.is_primary === true,
    );

    const user: User = {
      id: profile._json.id,
      login: profile._json.login,
      email: profile._json.email,
      image: profile._json.image.link,
      level: commonCoreCursus.level,
      campus_id: primaryCampus.campus_id,
    };

    const existingUser = await this.userService.getUserById(user.id);
    if (!existingUser) {
      await this.userService.createUser(user);
    } else {
    }
  }
}
