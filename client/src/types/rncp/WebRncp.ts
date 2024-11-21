import { Project } from "../models/Project";
import { SuiteProjects } from "./Rncp";

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
