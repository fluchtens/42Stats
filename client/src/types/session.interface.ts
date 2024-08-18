export interface Session {
  primary_id: string;
  session_id: string;
  current: boolean;
  attributes: {
    ip_address: string;
  };
}
