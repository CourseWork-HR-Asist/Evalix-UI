import { createHttpClient } from "../../../libs/http-factory";
import { HttpClient } from "../../../libs/http";
import { Skill } from "./type";

export class SkillService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  public getAll(): Promise<Skill[]> {
    return this.httpClient.get<Skill[]>("/skills/v1/skill/get-all", undefined, {
      showSuccessToast: false,
      errorMessage: "Error"
    });
  }

  public create(data: Skill): Promise<Skill> {
    return this.httpClient.post<Skill>("/skills/v1/skill/create", data, undefined, {
      successMessage: "Skill created successfully",
      errorMessage: "Error"
    });
  }

  public update(data: Skill): Promise<Skill> {
    return this.httpClient.put<Skill>(`/skills/v1/skill/update/${data.id}`, data, undefined, {
      successMessage: "Skill updated successfully",
      errorMessage: "Error"
    });
  }

  public remove(id: string): Promise<Skill> {
    return this.httpClient.delete<Skill>(`/skills/v1/skill/delete/${id}`, undefined, {
      successMessage: "Skill deleted successfully",
      errorMessage: "Error"
    });
  }
}

export const createSkillService = (signal?: AbortSignal): SkillService => {
  const httpClient = createHttpClient({
    timeout: 3000,
    defaultSuccessMessage: "Success",
    defaultErrorMessage: "Error",
    signal
  });
  
  return new SkillService(httpClient);
};
