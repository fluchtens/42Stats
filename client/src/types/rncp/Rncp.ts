import { Project } from "../models/Project";
import { DatabaseRncp } from "./DatabaseRncp";
import { NetworkRncp } from "./NetworkRncp";
import { SoftwareRncp } from "./SoftwareRncp";
import { WebRncp } from "./WebRncp";

export interface SuiteProjects {
  projects: Project[];
}

export interface Rncp {
  web: WebRncp;
  software: SoftwareRncp;
  network: NetworkRncp;
  database: DatabaseRncp;
}
