import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import {
    vacancyActions
} from "../store/vacancy.slice";
import { Vacancy, VacancySkillCreate, VacancySkillUpdate } from "../service/type";

export const useVacancySlice = () => {
  const dispatch = useAppDispatch();

  const vacancies = useAppSelector((state: { vacancy: { list: Vacancy[] } }) => state.vacancy.list);
  const currentVacancy = useAppSelector((state: { vacancy: { currentVacancy: Vacancy | null } }) => state.vacancy.currentVacancy);
  const loading = useAppSelector((state: { vacancy: { loading: boolean } }) => state.vacancy.loading);
  const error = useAppSelector((state: { vacancy: { error: string | null } }) => state.vacancy.error);

  const getVacancies = () => dispatch(vacancyActions.fetchVacancies());
  const getVacancyById = (id: string) => dispatch(vacancyActions.fetchVacancyById(id));
  const addVacancy = (data: Vacancy) => dispatch(vacancyActions.createVacancy(data));
  const editVacancy = (data: Vacancy) => dispatch(vacancyActions.updateVacancy(data));
  const removeVacancy = (id: string) => dispatch(vacancyActions.deleteVacancy(id));
  const updateVacancySkill = (data: VacancySkillUpdate) => dispatch(vacancyActions.updateVacancySkill(data));
  const removeVacancySkill = (id: string) => dispatch(vacancyActions.deleteVacancySkill(id));
  const addVacancySkill = (data: VacancySkillCreate) => dispatch(vacancyActions.addVacancySkill(data));
  const getVacancyByUserId = (id: string) => dispatch(vacancyActions.getVacancyByUserId(id));

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
