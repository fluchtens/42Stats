import { Project } from "@/types/models/project.interface";
import { SuiteProjects } from "./rncp.type";

interface WebProjects {
  projects: Project[];
  symfony: Project[];
  django: Project[];
  ror: Project[];
}

interface MobileProjects {
  projects: Project[];
  mobile: Project[];
}

export interface WebRncp {
  suite: SuiteProjects;
  web: WebProjects;
  mobile: MobileProjects;
}
