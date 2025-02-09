declare module 'express-session' {
  interface SessionData {
    user: User;
    deviceInfo: {
      ip: string | string[];
      browser: string;
      os: string;
      device: string;
    };
  }
}
export {};
