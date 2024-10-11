import { Project } from "@/types/models/project.interface";
import { DatabaseRncp } from "./database-rncp.type";
import { NetworkRncp } from "./network-rncp.type";
import { SoftwareRncp } from "./software-rncp.type";
import { WebRncp } from "./web-rncp.type";

export interface SuiteProjects {
  projects: Project[];
}

export interface Rncp {
  web: WebRncp;
  software: SoftwareRncp;
  network: NetworkRncp;
  database: DatabaseRncp;
}
