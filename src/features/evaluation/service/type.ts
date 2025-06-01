import { Resume } from "../../resume/service/type";
import { Vacancy } from "../../vacancy/service/type";

export type Evaluation = {
    id: string;
    comment: string;
    score: string;
    resumeId: string;
    vacancyId: string;
    resume?: Resume;
    vacancy?: Vacancy;
};

export type CreateEvaluation = {
    resumeId: string;
    vacancyId: string;
};