import { useAppDispatch, useAppSelector } from "../../../hooks/usereduxHooks";
import {
    fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill,
} from "../store/skill.slice";
import { Skill } from "../services/type";

export const useSkillSlice = () => {
  const dispatch = useAppDispatch();

  const skills = useAppSelector((state) => state.skill.list);
  const loading = useAppSelector((state) => state.skill.loading);
  const error = useAppSelector((state) => state.skill.error);

  const getSkills = () => dispatch(fetchSkills());
  const addSkill = (data: Skill) => dispatch(createSkill(data));
  const editSkill = (data: Skill) => dispatch(updateSkill(data));
  const removeSkill = (id: string) => dispatch(deleteSkill(id));

  return {
    skills,
    loading,
    error,
    getSkills,
    addSkill,
    editSkill,
    removeSkill,
  };
};
