import { Project } from "@/types/project.interface";
import { SuiteProjects } from "../rncp.type";

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
