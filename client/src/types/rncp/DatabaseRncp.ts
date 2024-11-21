import { Project } from "../models/Project";
import { SuiteProjects } from "./Rncp";

interface DbProjects {
  projects: Project[];
  symfony: Project[];
  django: Project[];
  ror: Project[];
}

interface AiProjects {
  projects: Project[];
  dataScience: Project[];
  python: Project[];
}

export interface DatabaseRncp {
  suite: SuiteProjects;
  db: DbProjects;
  ai: AiProjects;
}
