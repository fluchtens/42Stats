import { Injectable } from "@nestjs/common";
import { createClient } from "redis";
import { Role } from "src/role/types/role.type";

@Injectable()
export class SessionService {
  private redisClient;

  constructor() {
    this.redisClient = createClient({
      socket: { host: "redis", port: 6379 }
    });
    this.redisClient.connect();
  }

  async getUserSessions(userId: number, sessionId: string) {
    const keys = await this.redisClient.keys("sess:*");
    const sessions = [];
    for (const key of keys) {
      const sessionData = await this.redisClient.get(key);
      if (sessionData) {
        const parsedSession = JSON.parse(sessionData);
        console.log(typeof parsedSession.user.id, typeof userId);
        if (parsedSession.user.id === userId) {
          sessions.push({
            sessionId: key.replace("sess:", ""),
            data: parsedSession,
            current: key === `sess:${sessionId}`
          });
        }
      }
    }
    return sessions;
  }

  async deleteSession(sessionId: string) {
    this.redisClient.del(sessionId);
    return { message: "Session successfully deleted" };
  }

  async updateUserRolesSessions(userId: number, newRoles: Role[]) {
    const keys = await this.redisClient.keys("sess:*");
    for (const key of keys) {
      const sessionData = await this.redisClient.get(key);
      if (sessionData) {
        const parsedSession = JSON.parse(sessionData);
        if (parsedSession.user.id === userId) {
          parsedSession.user.roles = newRoles;
          await this.redisClient.set(key, JSON.stringify(parsedSession));
        }
      }
    }
  }
}
