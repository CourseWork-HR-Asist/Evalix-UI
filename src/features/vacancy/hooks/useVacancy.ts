import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import {
    vacancyActions
} from "../store/vacancy.slice";
import { Vacancy, VacancySkillCreate, VacancySkillUpdate } from "../service/type";
import { useCallback } from "react";

export const useVacancySlice = () => {
  const dispatch = useAppDispatch();

  const vacancies = useAppSelector((state: { vacancy: { list: Vacancy[] } }) => state.vacancy.list);
  const currentVacancy = useAppSelector((state: { vacancy: { currentVacancy: Vacancy | null } }) => state.vacancy.currentVacancy);
  const loading = useAppSelector((state: { vacancy: { loading: boolean } }) => state.vacancy.loading);
  const error = useAppSelector((state: { vacancy: { error: string | null } }) => state.vacancy.error);

  const getVacancies = useCallback(() => dispatch(vacancyActions.fetchVacancies()), [dispatch]);
  const getVacancyById = useCallback((id: string) => dispatch(vacancyActions.fetchVacancyById(id)), [dispatch]);
  const addVacancy = useCallback((data: Vacancy) => dispatch(vacancyActions.createVacancy(data)), [dispatch]);
  const editVacancy = useCallback((data: Vacancy) => dispatch(vacancyActions.updateVacancy(data)), [dispatch]);
  const removeVacancy = useCallback((id: string) => dispatch(vacancyActions.deleteVacancy(id)), [dispatch]);
  const updateVacancySkill = useCallback((data: VacancySkillUpdate) => dispatch(vacancyActions.updateVacancySkill(data)), [dispatch]);
  const removeVacancySkill = useCallback((id: string) => dispatch(vacancyActions.deleteVacancySkill(id)), [dispatch]);
  const addVacancySkill = useCallback((data: VacancySkillCreate) => dispatch(vacancyActions.addVacancySkill(data)), [dispatch]);
  const getVacancyByUserId = useCallback((id: string) => dispatch(vacancyActions.getVacancyByUserId(id)), [dispatch]);

  return {
    vacancies,
    currentVacancy,
    loading,
    error,
    getVacancies,
    getVacancyById,
    addVacancy,
    editVacancy,
    removeVacancy,
    updateVacancySkill,
    removeVacancySkill,
    addVacancySkill,
    getVacancyByUserId,
  };
};
