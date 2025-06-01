import { combineReducers } from "redux";
import skillSlice from '../../features/skill/store/skill.slice';
import userSlice from '../../features/authorization/store/user.slice';
import vacancyReducer from '../../features/vacancy/store/vacancy.slice';
import resumeReducer from '../../features/resume/store/resume.slice';
import evaluationReducer from '../../features/evaluation/store/evaluation.slice';
import { apiSlice } from "../../hooks/useReduxHooks";

export const rootReducer = combineReducers({
    skill: skillSlice,
    user: userSlice,
    vacancy: vacancyReducer,
    resumes: resumeReducer,
    evaluations: evaluationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;