export interface Session {
  primary_id: string;
  session_id: string;
  creation_date: string;
  expiry_date: string;
  current: boolean;
  attributes: {
    ip: string;
    browser: string;
    os: string;
    device: string;
  };
}
