import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { materialProps } from "../../../components/ui/helpers/materialTailwind";
import BaseModal from "../../../components/ui/modals/BaseModal";
import FormInput from "../../../components/form/FormInput";
import FromSelect from "../../../components/form/FromSelect";
import FormApiSelect from "../../../components/form/FormApiSelect";
import { ComponentProps } from "react";
import { levelOptions } from "../service/type";
import { Skill } from "../../skill/services/type";

interface VacancySkillModalProps {
  open: boolean;
  onClose: () => void;
  initialSkill?: {
    id?: string;
    skillId?: string;
    title: string;
    level: number;
    experience: number;
  };
  onSave: (data: {
    id?: string;
    skillId: string;
    title: string;
    level: number;
    experience: number;
  }) => void;
}

export default function VacancySkillModal({
  open,
  onClose,
  initialSkill,
  onSave,
}: VacancySkillModalProps) {
  const { control, handleSubmit, reset } = useForm<{
    skillId: string;
    title: string;
    level: number;
    experience: number;
  }>({
    defaultValues: {
      skillId: "",
      title: "",
      level: 1,
      experience: 0,
    },
  });

  useEffect(() => {
    if (initialSkill) {
      reset({
        skillId: initialSkill.skillId || "",
        title: initialSkill.title,
        level: initialSkill.level,
        experience: initialSkill.experience,
      });
    } else {
      reset({ skillId: "", title: "", level: 1, experience: 0 });
    }
  }, [initialSkill, open, reset]);

  const handleSave = handleSubmit((data) => {
    onSave({
      ...(initialSkill?.id ? { id: initialSkill.id } : {}),
      skillId: data.skillId,
      title: data.title,
      level: data.level,
      experience: data.experience,
    });
    onClose();
  });

  return (
    <BaseModal size="sm" open={open} handler={onClose}>
      <DialogHeader
        className="text-center justify-center text-xl font-bold text-gray-800 dark:text-gray-100"
        {...materialProps<ComponentProps<typeof DialogHeader>>()}
      >
        {initialSkill ? "Edit Skill" : "Add Skill"}
      </DialogHeader>
      <DialogBody
        className="overflow-y-auto px-4"
        {...materialProps<ComponentProps<typeof DialogBody>>()}
      >
        <div className="space-y-4">
          {!initialSkill ? (
            <div>
              <FormApiSelect<
                {
                  skillId: string;
                  title: string;
                  level: number;
                  experience: number;
                },
                Skill
              >
                name="skillId"
                label="Select Skill"
                placeholder="Choose a skill"
                control={control}
                path="/skills/v1/skill/get-all"
                rules={{ required: "Skill is required" }}
                mapOption={(option) => ({
                  label: option.title,
                  value: option.id,
                })}
              />
              <input type="hidden" name="title" />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Skill Title
              </label>
              <div className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600">
                {initialSkill.title}
              </div>
            </div>
          )}

          <div>
            <FromSelect
              name="level"
              label="Skill Level"
              control={control}
              options={levelOptions.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
              rules={{ required: "Skill level is required" }}
            />
          </div>

          <div>
            <FormInput
              name="experience"
              label="Experience Level"
              placeholder="Experience level"
              type="number"
              control={control}
              rules={{
                required: "Please select experience level",
                min: {
                  value: 0,
                  message: "Experience level must be at least 0",
                },
                max: {
                  value: 50,
                  message: "Experience level must be at most 50",
                },
              }}
            />
          </div>
        </div>
      </DialogBody>
      <DialogFooter
        className="space-x-2 p-4 border-t dark:border-gray-700"
        {...materialProps<ComponentProps<typeof DialogFooter>>()}
      >
        <Button
          variant="outlined"
          color="red"
          onClick={onClose}
          {...materialProps<ComponentProps<typeof Button>>()}
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          color="blue"
          onClick={handleSave}
          {...materialProps<ComponentProps<typeof Button>>()}
        >
          Save
        </Button>
      </DialogFooter>
    </BaseModal>
  );
}
