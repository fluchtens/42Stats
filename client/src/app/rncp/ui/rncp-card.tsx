"use client";

import { Project } from "@/types/project.interface";

interface RncpCardProps {
  title: string;
  projects: Project[];
  children?: React.ReactNode;
}

export const RncpCard = ({ title, projects, children }: RncpCardProps) => (
  <div className="p-4 w-full bg-card rounded-xl border">
    <span className="text-xl font-semibold">{title}</span>
    <ul className="mt-2 flex flex-col gap-2">
      {projects.map((project: Project) => (
        <li className="text-sm font-extralight" key={project.id}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-red-500" />
              <span>{project.name}</span>
            </div>
            <span>{project.difficulty} XP</span>
          </div>
        </li>
      ))}
      {children}
    </ul>
  </div>
);
