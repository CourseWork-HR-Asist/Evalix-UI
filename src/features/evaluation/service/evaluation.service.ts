import { createHttpClient } from "../../../libs/http-factory";
import { HttpClient } from "../../../libs/http";
import { Evaluation, CreateEvaluation } from "./type";    

export class EvaluationService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getAll(): Promise<Evaluation[]> {
        return this.httpClient.get<Evaluation[]>("/evaluations/v1/evaluation/get-all", undefined, {
            showSuccessToast: false,
            errorMessage: "Error"
        });
    }

    public getByVacancyId(vacancyId: string): Promise<Evaluation[]> {
        return this.httpClient.get<Evaluation[]>(`/evaluations/v1/evaluation/get-by-vacancy-id/${vacancyId}`, undefined, {
            showSuccessToast: false,
            errorMessage: "Error"
        });
    }

    public getByResumeId(resumeId: string): Promise<Evaluation[]> {
        return this.httpClient.get<Evaluation[]>(`/evaluations/v1/evaluation/get-by-resume-id/${resumeId}`, undefined, {
            showSuccessToast: false,
            errorMessage: "Error"
        });
    }

    public create(data: CreateEvaluation): Promise<Evaluation> {
        return this.httpClient.post<Evaluation>("/evaluations/v1/evaluation/create", data, undefined, {
            successMessage: "Evaluation created successfully",
            errorMessage: "Error"
        });
    }

    public remove(id: string): Promise<Evaluation> {
        return this.httpClient.delete<Evaluation>(`/evaluations/v1/evaluation/delete/${id}`, undefined, {
            successMessage: "Evaluation deleted successfully",
            errorMessage: "Error"
        });
    }
}

export const createEvaluationService = (signal?: AbortSignal): EvaluationService => {
    const httpClient = createHttpClient({
        timeout: 120000,
        defaultSuccessMessage: "Success",
        defaultErrorMessage: "Error",
        signal
    });
    
    return new EvaluationService(httpClient);
};


