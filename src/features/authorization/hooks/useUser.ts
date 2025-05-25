import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import { GoogleAuthResponse } from "../services/type";
import { fetchUsers, googleAuth as googleAuthAction, setCurrentUser} from "../store/user.slice";


export const useUserSlice = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.currentUser);
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  const users = useAppSelector((state) => state.user.list);

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
