import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CampusRepository } from 'src/campus/campus.repository';
import { Campus } from 'src/campus/types/campus.type';
import { ProjectRepository } from 'src/project/project.repository';
import { Project } from 'src/project/types/project.type';
import { User } from 'src/user/types/user.type';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class FetcherService implements OnModuleInit {
  private readonly logger = new Logger(FetcherService.name);
  private accessToken: string;
  private readonly clientId: string = process.env.FORTY_TWO_UID;
  private readonly clientSecret: string = process.env.FORTY_TWO_SECRET;
  private apiUrl: string = 'https://api.intra.42.fr/v2';

  constructor(
    private readonly userRepository: UserRepository,
    private readonly campusRepository: CampusRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  private async fetchAccessToken(): Promise<Promise<string>> {
    try {
      const response = await fetch('https://api.intra.42.fr/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error_description);
      }

      return data.access_token;
    } catch (error: any) {
      this.logger.error('fetchAccessToken() ' + error.message);
      return null;
    }
  }

  private async fetchCampusesPage(page: number): Promise<any[]> {
    try {
      const response = await fetch(
        this.apiUrl + `/campus?page=${page}&?page[size]=${100}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      );

      if (!response.ok) {
        this.logger.error(
          `${response.status} ${response.statusText}, retry in 15 seconds...`,
        );
        if (response.status === 401) {
          this.accessToken = await this.fetchAccessToken();
        }
        await new Promise((resolve) => setTimeout(resolve, 15000));
        return this.fetchCampusesPage(page);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      this.logger.error('fetchCampusesPage() ' + error.message);
      return [];
    }
  }

  private async fetchAllCampuses() {
    let page = 1;

    while (true) {
      const campusesJson = await this.fetchCampusesPage(page);
      if (campusesJson.length === 0) {
        break;
      }
      for (const campusJson of campusesJson) {
        const campus: Campus = {
          id: campusJson.id,
          name: campusJson.name,
          country: campusJson.country,
          user_count: campusJson.users_count,
          student_count: 0,
          average_level: 0.0,
        };
        await this.campusRepository.save(campus);
        await this.fetchAllCampusUsers(campus.id);
        const userCount = await this.userRepository.countByCampus(campus.id);
        campus.student_count = userCount;
        const averageLevel = await this.userRepository.findAverageLevelByCampus(
          campus.id,
        );
        if (averageLevel !== null && averageLevel !== 0) {
          campus.average_level = Math.round(averageLevel * 100.0) / 100.0;
        } else {
          campus.average_level = 0.0;
        }
        await this.campusRepository.update(campus);
      }
      page++;
    }
  }

  private async fetchCampusUsersPage(
    campusId: number,
    page: number,
  ): Promise<any[]> {
    try {
      const apiUrl = `${this.apiUrl}/cursus_users?filter[cursus_id]=${21}&filter[campus_id]=${campusId}&page[number]=${page}&page[size]=${100}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        this.logger.error(
          `${response.status} ${response.statusText}, retry in 15 seconds...`,
        );
        if (response.status === 401) {
          this.accessToken = await this.fetchAccessToken();
        }
        await new Promise((resolve) => setTimeout(resolve, 15000));
        return this.fetchCampusUsersPage(campusId, page);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      this.logger.error('fetchCampusUsersPage() ' + error.message);
      return [];
    }
  }

  public async fetchAllCampusUsers(campusId: number): Promise<void> {
    let page = 1;
    while (true) {
      const usersJson = await this.fetchCampusUsersPage(campusId, page);
      if (usersJson.length <= 0) {
        break;
      }
      for (const userJson of usersJson) {
        const userObj = userJson.user;
        if (userObj['staff?']) {
          continue;
        }
        const user: User = {
          id: userObj.id,
          email: userObj.email,
          login: userObj.login,
          first_name: userObj.first_name,
          last_name: userObj.last_name,
          image: userObj.image?.link || null,
          pool_month: userObj.pool_month || null,
          pool_year: userObj.pool_year || null,
          level: userJson.level,
          campus_id: campusId,
          blackholed: false,
        };
        if (userJson.end_at && !userObj['alumni?']) {
          const blackholedAt = new Date(userJson.end_at);
          if (blackholedAt < new Date()) {
            user.blackholed = true;
          }
        }
        await this.userRepository.save(user);
      }
      page++;
    }
  }

  private async fetchProjectsPage(page: number): Promise<any[]> {
    try {
      const apiUrl = `${this.apiUrl}/projects?page[number]=${page}&page[size]=${100}&cursus_id=${21}&sort=${'id'}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        this.logger.error(
          `${response.status} ${response.statusText}, retry in 15 seconds...`,
        );
        if (response.status === 401) {
          this.accessToken = await this.fetchAccessToken();
        }
        await new Promise((resolve) => setTimeout(resolve, 15000));
        return this.fetchProjectsPage(page);
      }

      return await response.json();
    } catch (error) {
      this.logger.error('fetchProjectsPage() ' + error.message);
      return [];
    }
  }

  private async fetchAllProjects() {
    let page = 1;
    while (true) {
      const projectsJson = await this.fetchProjectsPage(page);
      if (projectsJson.length <= 0) {
        break;
      }
      for (const projectJson of projectsJson) {
        const project: Project = {
          id: projectJson.id,
          name: projectJson.name,
          slug: projectJson.slug,
          difficulty: projectJson.difficulty,
        };
        if (
          project.id <= 0 ||
          project.name === null ||
          project.slug === null ||
          project.difficulty <= 0
        ) {
          continue;
        }
        if (
          (await this.projectRepository.findById(project.id)) ||
          (await this.projectRepository.findByName(project.name)) ||
          (await this.projectRepository.findBySlug(project.slug))
        ) {
          continue;
        }
        await this.projectRepository.save(project);
      }
      page++;
    }
  }

  @Cron('0 5 * * *')
  private async fetchData() {
    this.logger.log('Start scrapping data from api.intra.42.fr');

    this.accessToken = await this.fetchAccessToken();
    if (!this.accessToken) {
      return this.logger.error('Failed to fetch access token.');
    }

    await this.userRepository.deleteAll();
    await this.campusRepository.deleteAll();
    await this.projectRepository.deleteAll();

    await this.fetchAllProjects();
    await this.fetchAllCampuses();

    this.logger.log('End of data scrapping from api.intra.42.fr');
  }

  onModuleInit() {
    this.fetchData();
  }
}
