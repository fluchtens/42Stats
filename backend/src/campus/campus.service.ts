import { Injectable, NotFoundException } from '@nestjs/common';
import { CampusRepository } from './campus.repository';

@Injectable()
export class CampusService {
  constructor(private readonly campusRepository: CampusRepository) {}

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
}
