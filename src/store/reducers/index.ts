import { combineReducers } from "redux";
import skillSlice from '../../features/skill/store/skill.slice';

export const rootReducer = combineReducers({
    skill: skillSlice,
});

export type RootState = ReturnType<typeof rootReducer>;