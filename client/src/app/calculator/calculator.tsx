"use client";

import { NotAuthAlert } from "@/components/not-auth-alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { getProjects } from "@/services/project.service";
import { Project } from "@/types/project.interface";
import { useEffect, useState } from "react";

export const Calculator = () => {
  const [level, setLevel] = useState<number>(0);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [grade, setGrade] = useState<number>(100);
  const [newLevel, setNewLevel] = useState<number | null>(null);
  const { user } = useAuth();

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(Number(e.target.value));
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(Number(e.target.value));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const xpRequired = [
      0, 462, 2688, 5885, 11777, 29217, 46255, 63559, 74340, 85483, 95000, 105630, 124446, 145782, 169932, 197316, 228354, 263508, 303366, 348516,
      399672, 457632, 523320, 597786, 682164, 777756, 886074, 1008798, 1147902, 1305486, 1484070,
    ];
    const currentLevel = level;
    const projectXp = 24360;
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
    <div className="m-auto max-w-screen-sm w-full">
      {user === null && <NotAuthAlert />}
      {user && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold">XP Calculator</h1>
          <p className="text-sm md:text-lg font-light text-muted-foreground">Calculate your next XP level after turning in a project.</p>
          <Card className="mt-6">
            <form onSubmit={handleFormSubmit}>
              <CardContent className="pt-6">
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="level">Level</Label>
                    <Input id="level" type="number" step="0.01" placeholder="Your current level" value={level} onChange={handleLevelChange} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="project">Project</Label>
                    <Select>
                      <SelectTrigger id="project">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {projects?.map((project) => (
                          <SelectItem key={project.id} value={project.id.toString()}>
                            {project.name} ({project.difficulty} XP)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          <Card className="mt-6">
            <CardContent className="pt-6">
              <p className="text-2xl font-bold text-center">Result</p>
              <p>{newLevel}</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
