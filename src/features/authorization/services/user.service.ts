import { createHttpClient } from "../../../libs/http-factory";
import { GoogleAuthResponse, User, UserWithToken } from "./type";

export const createUserService = (signal?: AbortSignal) => {
  const httpClient = createHttpClient({
    signal,
    timeout: 5000, 
  });
  
  return {
    getAll: () => httpClient.get<User[]>("/users/v1/user/get-all"),
    getById: (id: string) => 
      httpClient.get<User>(`/users/v1/user/get-by-id/${id}`, undefined, {
        showSuccessToast: false,
        errorMessage: 'Failed to fetch user data, please try relogin or a few minutes later'
      }),
    googleAuth: (data: GoogleAuthResponse) => 
      httpClient.post<UserWithToken>("/users/v1/user/login-with-google", data),
    setToken: (token: string) => httpClient.setToken(token),
    getToken: () => httpClient.getToken(),
  };
};