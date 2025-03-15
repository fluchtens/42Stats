declare module "express-session" {
  interface SessionData {
    user: User;
    deviceInfo: {
      browser: string;
      os: string;
      device: string;
    };
  }
}
export {};
