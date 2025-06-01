import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import {
    fetchEvaluations,
    fetchEvaluationsByVacancyId,
    fetchEvaluationsByResumeId,
    createEvaluation,
    deleteEvaluation,
} from "../store/evaluation.slice";
import { CreateEvaluation } from "../service/type";
import { Evaluation } from "../service/type";

export const useEvaluationSlice = () => {
  const dispatch = useAppDispatch();

  const evaluations = useAppSelector((state: { evaluations: { list: Evaluation[] } }) => state.evaluations.list);
  const loading = useAppSelector((state: { evaluations: { loading: boolean } }) => state.evaluations.loading);
  const error = useAppSelector((state: { evaluations: { error: string | null } }) => state.evaluations.error);

  const getEvaluations = () => dispatch(fetchEvaluations());
  const getEvaluationsByVacancyId = (vacancyId: string) => dispatch(fetchEvaluationsByVacancyId(vacancyId));
  const getEvaluationsByResumeId = (resumeId: string) => dispatch(fetchEvaluationsByResumeId(resumeId));
  const addEvaluation = (data: CreateEvaluation) => dispatch(createEvaluation(data));
  const removeEvaluation = (id: string) => dispatch(deleteEvaluation(id));

  return {
    evaluations,
    loading,
    error,
    getEvaluations,
    getEvaluationsByVacancyId,
    getEvaluationsByResumeId,
    addEvaluation,
    removeEvaluation,
  };
};
