import { createHttpClient } from "../../../libs/http-factory";
import { HttpClient } from "../../../libs/http";
import { Vacancy, VacancySkill, VacancySkillCreate, VacancySkillUpdate } from "./type";


export class VacancyService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getAll(): Promise<Vacancy[]> {
        return this.httpClient.get<Vacancy[]>("/vacancies/v1/vacancy/get-all", undefined, {
            showSuccessToast: false,
            errorMessage: "Error"
        });
    }

    public getById(id: string): Promise<Vacancy> {
        return this.httpClient.get<Vacancy>(`/vacancies/v1/vacancy/get-by-id/${id}`, undefined, {
            showSuccessToast: false,
            errorMessage: "Error"
        });
    }

    public create(data: Vacancy): Promise<Vacancy> {
        return this.httpClient.post<Vacancy>("/vacancies/v1/vacancy/create", data, undefined, {
            successMessage: "Vacancy created successfully",
            errorMessage: "Error"
        });
    }

    public update(data: Vacancy): Promise<Vacancy> {
        return this.httpClient.put<Vacancy>(`/vacancies/v1/vacancy/update/${data.id}`, data, undefined, {
            successMessage: "Vacancy updated successfully",
            errorMessage: "Error"
        });
    }

    public delete(id: string): Promise<Vacancy> {
        return this.httpClient.delete<Vacancy>(`/vacancies/v1/vacancy/delete/${id}`, undefined, {
            successMessage: "Vacancy deleted successfully",
            errorMessage: "Error"
        });
    }
    public updateVacancySkill(data: VacancySkillUpdate): Promise<VacancySkill> {
        return this.httpClient.put<VacancySkill>(`/vacancySkills/v1/vacancy-skill/update/${data.id}`, data, undefined, {
            successMessage: "Vacancy skill updated successfully",
            errorMessage: "Error"
        });
    }
    public deleteVacancySkill(id: string): Promise<VacancySkill> {
        return this.httpClient.delete<VacancySkill>(`/vacancySkills/v1/vacancy-skill/delete/${id}`, undefined, {
            successMessage: "Vacancy skill deleted successfully",
            errorMessage: "Error"
        });
    }
    public addVacancySkill(data: VacancySkillCreate): Promise<VacancySkill> {
        return this.httpClient.post<VacancySkill>(`/vacancySkills/v1/vacancy-skill/create`, data, undefined, {
            successMessage: "Vacancy skill added successfully",
            errorMessage: "Error"
        });
    }

}

export const createVacancyService = (signal?: AbortSignal): VacancyService => {
    const httpClient = createHttpClient({
        timeout: 3000,
        defaultSuccessMessage: "Success",
        defaultErrorMessage: "Error",
        signal
    });
    
    return new VacancyService(httpClient);
};
