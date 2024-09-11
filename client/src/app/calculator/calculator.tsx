"use client";

import { NotAuthAlert } from "@/components/not-auth-alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { getProjects } from "@/services/project.service";
import { Project } from "@/types/project.interface";
import { useEffect, useState } from "react";
import { FaCalculator } from "react-icons/fa6";
import { ProjectSelector } from "./project-selector";

export const Calculator = () => {
  const [level, setLevel] = useState<number>(0);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [grade, setGrade] = useState<number>(100);
  const [newLevel, setNewLevel] = useState<number>(0);
  const { user } = useAuth();

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(Number(e.target.value));
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(Number(e.target.value));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedProject) {
      return;
    }

    const xpRequired = [
      0, 462, 2688, 5885, 11777, 29217, 46255, 63559, 74340, 85483, 95000, 105630, 124446, 145782, 169932, 197316, 228354, 263508, 303366, 348516,
      399672, 457632, 523320, 597786, 682164, 777756, 886074, 1008798, 1147902, 1305486, 1484070,
    ];
    const currentLevel = level;
    const projectXp = selectedProject.difficulty;
    const projectGrade = grade;

    const currentLevelFloor = Math.floor(currentLevel);
    const xpRequiredAtCurrentLevel = xpRequired[currentLevelFloor];
    const xpRequiredToNextLevel = xpRequired[currentLevelFloor + 1] - xpRequiredAtCurrentLevel;
    const newXp = xpRequiredAtCurrentLevel + (currentLevel - currentLevelFloor) * xpRequiredToNextLevel;
    const earnedXp = (projectGrade * projectXp) / 100;
    const nextXp = newXp + earnedXp;

    let newLevel = 0;
    while (xpRequired[newLevel + 1] < nextXp) {
      newLevel++;
    }
    const diff = (nextXp - xpRequired[newLevel]) / (xpRequired[newLevel + 1] - xpRequired[newLevel]);
    newLevel += diff;

    setNewLevel(Number(newLevel.toFixed(2)));
  };

  const fetchProjects = async () => {
    const fetchedProjects = await getProjects();
    if (fetchedProjects && fetchedProjects.length > 0) {
      setProjects(fetchedProjects);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      {user === null && <NotAuthAlert />}
      {user && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold">XP Calculator</h1>
          <p className="text-sm md:text-lg font-light text-muted-foreground">Calculate your next XP level after turning in a project.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2 bg-popover">
              <form onSubmit={handleFormSubmit}>
                <CardContent className="pt-6">
                  <div className="grid items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="level">Level</Label>
                      <Input id="level" type="number" step="0.01" placeholder="Your current level" value={level} onChange={handleLevelChange} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="project">Project</Label>
                      <ProjectSelector projects={projects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="grade">Grade</Label>
                      <Input id="grade" type="number" placeholder="Your project grade" value={grade} onChange={handleGradeChange} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit">Calculate</Button>
                </CardFooter>
              </form>
            </Card>
            <Card className="md:col-span-1 flex-col flex justify-center items-center bg-popover">
              <CardContent className="pt-6 flex-col flex items-center gap-5">
                <FaCalculator className="w-20 h-20" />
                <div className="flex-col flex items-center">
                  <span className="text-base font-medium text-muted-foreground">Level</span>
                  <span className="text-2xl font-bold">{newLevel}</span>
                  <span className="text-base font-medium text-green-600">+{(newLevel - level).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
};
