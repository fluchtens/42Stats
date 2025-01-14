import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CampusRepository } from 'src/campus/campus.repository';
import { Campus } from 'src/campus/types/campus.type';
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

        await this.campusRepository.saveCampus(campus);

        // // Fetch des utilisateurs du campus
        // await this.fetchAllCampusUsers(campus);

        // // Calcul du nombre d'utilisateurs et du niveau moyen
        // const userCount = await this.countUsersByCampus(campus.id);
        // campus.studentCount = userCount;

        // const averageLevel = await this.findAverageLevelByCampus(campus.id);
        // campus.averageLevel = averageLevel !== null && averageLevel !== 0 ? Math.round(averageLevel * 100.0) / 100.0 : 0.0;

        // // Sauvegarder les informations du campus mises à jour
        // await this.saveCampus(campus);
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

    await this.userRepository.deleteAllUsers();
    await this.campusRepository.deleteAllCampuses();
    // await this.projectRepository.deleteAll();

    await this.fetchAllCampuses();
    // await this.fetchAllProjects();

    this.logger.log('End of data scrapping from api.intra.42.fr');
  }

  onModuleInit() {
    this.fetchData();
  }
}
