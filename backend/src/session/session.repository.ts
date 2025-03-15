import { Injectable } from "@nestjs/common";
import { createClient } from "redis";

@Injectable()
export class SessionRepository {
  private redisClient;

  constructor() {
    this.redisClient = createClient({
      socket: { host: "redis", port: 6379 }
    });
    this.redisClient.connect();
  }

  async getAll(userId: number, sessionId: string) {
    const keys = await this.redisClient.keys("sess:*");
    const sessions = [];
    for (const key of keys) {
      const sessionData = await this.redisClient.get(key);
      if (sessionData) {
        const parsedSession = JSON.parse(sessionData);
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

  async delete(sessionId: string) {
    this.redisClient.del(sessionId);
  }
}
