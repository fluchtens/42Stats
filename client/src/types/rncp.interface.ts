import { Project } from "./project.interface";

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

interface SuiteProjects {
  projects: Project[];
}

interface WebRncp {
  suite: SuiteProjects;
  web: WebProjects;
  mobile: MobileProjects;
}

interface OopProjects {
  projects: Project[];
  symfony: Project[];
  django: Project[];
  ror: Project[];
  mobile: Project[];
  object: Project[];
}

interface SoftwareRncp {
  suite: SuiteProjects;
  oop: OopProjects;
}

export interface Rncp {
  web: WebRncp;
  software: SoftwareRncp;
}
