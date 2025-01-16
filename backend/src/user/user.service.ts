import { Injectable } from '@nestjs/common';
import { User } from './types/user.type';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public isValid(user: User): boolean {
    if (!user.id) return false;
    if (!user.email || user.email.trim() === '') return false;
    if (!user.login || user.login.trim() === '') return false;
    if (!user.first_name || user.first_name.trim() === '') return false;
    if (!user.last_name || user.last_name.trim() === '') return false;
    if (!user.pool_month || user.pool_month.trim() === '') return false;
    if (!user.pool_year || user.pool_year.trim() === '') return false;
    return true;
  }

  public async getUserCount() {
    return this.userRepository.count();
  }

  public async getUserAverageLevel() {
    return (await this.userRepository.findAverageLevel()).toFixed(2);
  }

  public async getCampusUsers(
    campusId: number,
    poolMonth: string,
    poolYear: string,
    page: number,
    pageSize: number,
  ) {
    return this.userRepository.findByCampus(
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
    return this.userRepository.countByCampusAndPool(
      campusId,
      poolMonth,
      poolYear,
    );
  }
}
