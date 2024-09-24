import { Project } from "./project.interface";

interface WebRncp {
  projects: Project[];
  symfony: Project[];
  django: Project[];
  ror: Project[];
}

interface MobileRncp {
  projects: Project[];
  mobile: Project[];
}

interface SuiteRncp {
  projects: Project[];
}

export interface Rncp {
  web: WebRncp;
  mobile: MobileRncp;
  suite: SuiteRncp;
}
