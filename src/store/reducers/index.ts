import { combineReducers } from "redux";
import skillSlice from '../../features/skill/store/skill.slice';
import userSlice from '../../features/authorization/store/user.slice';

export const rootReducer = combineReducers({
    skill: skillSlice,
    user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;