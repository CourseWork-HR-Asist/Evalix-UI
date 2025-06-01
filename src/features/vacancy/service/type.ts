import { User } from "../../authorization/services/type";

export type VacancySkill = {
    id?: string;
    skillId: string;
    title: string;
    level?: number;
    experience?: number;
}

export type VacancySkillCreate = {
    vacancyId: string;
    skillId: string;
    level: number;
    experience: number;
}
export type VacancySkillUpdate = {
    id: string;
    level: number;
    experience: number;
}
export type Vacancy = {
    id: string;
    title: string;
    description: string;
    experience: string;
    education: string;
    userId: string;
    user: User;
    createdAt: Date;
    skills: VacancySkill[];

}
export const levelOptions = [
    { value: 1, label: "Beginner" },
    { value: 2, label: "Intermediate" },
    { value: 3, label: "Advanced" },
    { value: 4, label: "Expert" },
  ];

export enum VacancySlice {
 getAll = "vacancies/fetchAll", 
 getById = "vacancies/getById", 
 create = "vacancies/create", 
 update = "vacancies/update", 
 delete = "vacancies/delete",    
 updateSkill = "vacancies/skill/update",
 deleteSkill = "vacancies/skill/delete",
 addSkill = "vacancies/skill/add"
}
