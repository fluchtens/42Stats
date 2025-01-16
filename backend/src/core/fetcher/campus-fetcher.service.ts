// import { Injectable } from '@nestjs/common';
// import { CampusRepository } from 'src/campus/campus.repository';
// import { Campus } from 'src/campus/types/campus.type';
// import { UserRepository } from 'src/user/user.repository';
// import { FetcherService } from './fetcher.service';

// @Injectable()
// export class CampusFetcherService extends FetcherService {
//   constructor(
//     protected readonly campusRepository: CampusRepository,
//     protected readonly userRepository: UserRepository,
//   ) {
//     super(campusRepository, userRepository);
//   }

//   private async fetchCampusesPage(page: number): Promise<any[]> {
//     try {
//       const response = await fetch(
//         this.apiUrl + `/campus?page=${page}&?page[size]=${100}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${this.accessToken}`,
//           },
//         },
//       );

//       if (!response.ok) {
//         this.logger.error(
//           `${response.status} ${response.statusText}, retry in 15 seconds...`,
//         );
//         if (response.status === 401) {
//           this.accessToken = await this.fetchAccessToken();
//         }
//         await new Promise((resolve) => setTimeout(resolve, 15000));
//         return this.fetchCampusesPage(page);
//       }

//       const data = await response.json();
//       return data;
//     } catch (error: any) {
//       this.logger.error('fetchCampusesPage() ' + error.message);
//       return [];
//     }
//   }

//   public async fetchAllCampuses() {
//     let page = 1;

//     while (true) {
//       const campusesJson = await this.fetchCampusesPage(page);
//       if (campusesJson.length === 0) {
//         break;
//       }
//       for (const campusJson of campusesJson) {
//         const campus: Campus = {
//           id: campusJson.id,
//           name: campusJson.name,
//           country: campusJson.country,
//           user_count: campusJson.users_count,
//           student_count: 0,
//           average_level: 0.0,
//         };
//         await this.campusRepository.save(campus);
//         // await this.fetchAllCampusUsers(campus.id);
//         // const userCount = await this.userRepository.countByCampus(campus.id);
//         // campus.student_count = userCount;
//         // const averageLevel = await this.userRepository.findAverageLevelByCampus(
//         //   campus.id,
//         // );
//         // if (averageLevel !== null && averageLevel !== 0) {
//         //   campus.average_level = Math.round(averageLevel * 100.0) / 100.0;
//         // } else {
//         //   campus.average_level = 0.0;
//         // }
//         // await this.campusRepository.update(campus);
//       }
//       page++;
//     }
//   }
// }
