import { combineReducers } from "redux";
// import { signReducer } from '../../features/user-pages/store/reducer';

export const rootReducer = combineReducers({
    // sign: signReducer,
});

export type RootState = ReturnType<typeof rootReducer>;