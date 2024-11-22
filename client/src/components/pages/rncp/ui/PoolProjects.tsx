import { Project } from "@/types/models/Project";

interface PoolProjectsProps {
  title: string;
  projects: Project[];
}

export const PoolProjects = ({ title, projects }: PoolProjectsProps) => (
  <>
    {projects && projects.length > 0 && (
      <div className="text-sm font-light">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-500" />
            <span>Piscine {title}</span>
          </div>
          <span>0 XP</span>
        </div>
        <ul className="mt-2 flex flex-col gap-2">
          {projects.map((project: Project) => (
            <li className="ml-2" key={project.id}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-red-500" />
                  <span>{project.name}</span>
                </div>
                <span>{project.difficulty} XP</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);
