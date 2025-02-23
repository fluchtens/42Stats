import { Injectable } from "@nestjs/common";
import { createClient } from "redis";
import { SessionRepository } from "./session.repository";

@Injectable()
export class SessionService {
  private redisClient;

  constructor(private readonly sessionRepository: SessionRepository) {
    this.redisClient = createClient({
      socket: { host: "redis", port: 6379 }
    });
    this.redisClient.connect();
  }

  async getUserSessions(userId: number, sessionId: string) {
    return await this.sessionRepository.getAll(userId, sessionId);
  }

  async deleteSession(sessionId: string) {
    await this.sessionRepository.delete(sessionId);
    return { message: "Session successfully deleted" };
  }
}
