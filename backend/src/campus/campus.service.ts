import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { CampusRepository } from './campus.repository';

@Injectable()
export class CampusService {
  constructor(
    private readonly campusRepository: CampusRepository,
    private readonly userRepository: UserRepository,
  ) {}

  private readonly monthNames: string[] = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  public async getCampuses() {
    return await this.campusRepository.getCampuses();
  }

  public async getCampusCount() {
    return await this.campusRepository.getCampusCount();
  }

  public async getCampusById(id: number) {
    const campus = await this.campusRepository.getCampusById(id);
    if (!campus) {
      throw new NotFoundException(`Campus not found`);
    }
    return campus;
  }

  async getCampusPools(id: number) {
    const usersPoolDates = await this.userRepository.getUserCampusPoolDate(id);
    const poolDates = usersPoolDates
      .filter(
        (value, index, self) =>
          self.findIndex(
            (v) => v.month === value.month && v.year === value.year,
          ) === index,
      )
      .sort((a, b) => {
        const yearComparison = parseInt(a.year) - parseInt(b.year);
        if (yearComparison !== 0) {
          return yearComparison;
        }
        const monthA = this.monthNames.indexOf(a.month.toLowerCase());
        const monthB = this.monthNames.indexOf(b.month.toLowerCase());
        return monthA - monthB;
      });
    return poolDates;
  }
}
