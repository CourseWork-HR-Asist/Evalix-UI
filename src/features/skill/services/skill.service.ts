import { HttpClient } from "../../../libs/http";
import { Skill } from "./type";
const httpClient = new HttpClient({ baseURL: "http://localhost:5296/skills/v1" });

export const skillService = {
  getAll: () => httpClient.get<Skill[]>("/skill/get-all"),
  create: (data: Skill) => httpClient.post<Skill>("/skill/create", data),
  update: (data: Skill) => httpClient.put<Skill>(`/skill/update/${data.id}`, data),
  remove: (id: string) => httpClient.delete<Skill>(`/skill/delete/${id}`)
};
