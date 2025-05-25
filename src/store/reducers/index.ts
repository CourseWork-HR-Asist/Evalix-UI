import { combineReducers } from "redux";
import skillSlice from '../../features/skill/store/skill.slice';
import userSlice from '../../features/authorization/store/user.slice';
import { apiSlice } from "../../hooks/useReduxHooks";

export const rootReducer = combineReducers({
    skill: skillSlice,
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;