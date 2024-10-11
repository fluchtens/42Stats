import { Project } from "@/types/project.interface";
import { NetworkRncp } from "./rncp/network-rncp.type";
import { SoftwareRncp } from "./rncp/software-rncp.type";
import { WebRncp } from "./rncp/web-rncp.type";

export interface SuiteProjects {
  projects: Project[];
}

export interface Rncp {
  web: WebRncp;
  software: SoftwareRncp;
  network: NetworkRncp;
}
