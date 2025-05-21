import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../../../hooks/usereduxHooks";
import { createUserService } from "../services/user.service";
import { setCurrentUser } from "../store/user.slice";
import { parseJwt } from "../../../libs/jwt";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const service = createUserService();
      const token = service.getToken();

      if (!token) {
        dispatch(setCurrentUser(null));
        return;
      }

      try {
        const decodedToken = parseJwt(token);
        if (!decodedToken?.sub) {
          dispatch(setCurrentUser(null));
          return;
        }
        const userData = await service.getById(decodedToken.sub);
        if (userData) {
          dispatch(
            setCurrentUser({
              ...userData,
              token,
            })
          );
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        dispatch(setCurrentUser(token));
      }
    };

    fetchUserData();
  }, [dispatch]);

  return <>{children}</>;
};
