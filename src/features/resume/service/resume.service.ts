import { createHttpClient } from "../../../libs/http-factory";
import { HttpClient } from "../../../libs/http";
import { Resume } from "./type";

export class ResumeService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getAll(): Promise<Resume[]> {
    return this.httpClient.get<Resume[]>("/resumes/v1/resume/get-all", undefined, {
      showSuccessToast: false,
      errorMessage: "Error fetching resumes"
    });
  }

  public getByUserId(id: string): Promise<Resume[]> {
    return this.httpClient.get<Resume[]>(`/resumes/v1/resume/get-by-user-id/${id}`, undefined, {
      showSuccessToast: false,
      errorMessage: "Error fetching user resume"
    });
  }

  public create(file: File, userId: string): Promise<Resume> {
    return this.httpClient.uploadFileWithQuery<Resume, unknown, { userId: string }>(
      "/resumes/v1/resume/create",
      file,
      { userId },
      undefined,
      undefined,
      {
        successMessage: "Resume uploaded successfully",
        errorMessage: "Error uploading resume"
      }
    );
  }

  public remove(id: string): Promise<Resume> {
    return this.httpClient.delete<Resume>(`/resumes/v1/resume/delete/${id}`, undefined, {
      successMessage: "Resume deleted successfully",
      errorMessage: "Error deleting resume"
    });
  }

}

export const createResumeService = (signal?: AbortSignal): ResumeService => {
  const httpClient = createHttpClient({
    timeout: 30000,
    defaultSuccessMessage: "Success",
    defaultErrorMessage: "Error",
    signal
  });
  
  return new ResumeService(httpClient);
};