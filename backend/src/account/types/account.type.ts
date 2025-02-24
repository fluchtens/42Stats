import { Role } from "src/role/types/role.type";

export type Account = {
  id: number;
  login: string;
  email: string;
  image: string;
  level: number;
  campus_id: string;
  roles?: Role[];
};
