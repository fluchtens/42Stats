import { Project } from "@/types/models/project.interface";
import { SuiteProjects } from "./rncp.type";

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
