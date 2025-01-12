import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUsers() {
    return this.userRepository.getUsers();
  }

  public async getUserCount() {
    return this.userRepository.getUserCount();
  }

  public async getUserAverageLevel() {
    return (await this.userRepository.getUserAverageLevel()).toFixed(2);
  }

  public async getCampusUsers(
    campusId: number,
    poolMonth: string,
    poolYear: string,
    page: number,
    pageSize: number,
  ) {
    return this.userRepository.getCampusUsers(
      campusId,
      poolMonth,
      poolYear,
      page,
      pageSize,
    );
  }

  public async getCampusUsersCount(
    campusId: number,
    poolMonth: string,
    poolYear: string,
  ) {
    return this.userRepository.getCampusUsersCount(
      campusId,
      poolMonth,
      poolYear,
    );
  }
}
