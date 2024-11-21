import { Project } from "../models/Project";
import { SuiteProjects } from "./Rncp";

interface UnixProjects {
  projects: Project[];
}

interface SystemProjects {
  projects: Project[];
}

interface SecurityProjects {
  projects: Project[];
  security: Project[];
}

export interface NetworkRncp {
  suite: SuiteProjects;
  unix: UnixProjects;
  system: SystemProjects;
  security: SecurityProjects;
}
