import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import { GoogleAuthResponse, User } from "../services/type";
import { fetchUsers, googleAuth as googleAuthAction, setCurrentUser} from "../store/user.slice";


export const useUserSlice = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: { user: { currentUser: (User & { token: string }) | null } }) => state.user.currentUser);
  const loading = useAppSelector((state: { user: { loading: boolean } }) => state.user.loading);
  const error = useAppSelector((state: { user: { error: string | null } }) => state.user.error);
  const users = useAppSelector((state: { user: { list: User[] } }) => state.user.list);

  const getUsers = () => dispatch(fetchUsers());
  const handleGoogleAuth = async (token: GoogleAuthResponse) => {
    if (!token) {
      return;
    }
    
    const result = await dispatch(googleAuthAction(token));
    
    if (result.meta.requestStatus === 'fulfilled') {
      const payload = result.payload as GoogleAuthResponse;
      if (payload.token) {
        dispatch(setCurrentUser(payload.token));
      }
    }
    
    return result;
  };

  return {
    user,
    loading,
    error,
    users,
    getUsers,
    googleAuth: handleGoogleAuth
  };
}
