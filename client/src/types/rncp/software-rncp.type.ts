import { Project } from "@/types/models/project.interface";
import { SuiteProjects } from "./rncp.type";

interface OopProjects {
  projects: Project[];
  symfony: Project[];
  django: Project[];
  ror: Project[];
  mobile: Project[];
  object: Project[];
}

interface FpProjects {
  projects: Project[];
  ocaml: Project[];
}

interface IpProjects {
  projects: Project[];
}

export interface SoftwareRncp {
  suite: SuiteProjects;
  oop: OopProjects;
  fp: FpProjects;
  ip: IpProjects;
}
