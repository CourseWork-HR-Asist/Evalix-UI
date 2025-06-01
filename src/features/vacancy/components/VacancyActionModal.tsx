import { DialogBody } from "@material-tailwind/react";

import BaseModal from "../../../components/ui/modals/BaseModal";
import { materialProps } from "../../../components/ui/helpers/materialTailwind";
import type { ComponentProps } from "react";
import FormInput from "../../../components/form/FormInput";
import { useForm } from "react-hook-form";
import { Vacancy } from "../service/type";
import { FormInputContainer } from "../../../components/form/containers/FormInputContainer";
import FormTextArea from "../../../components/form/FormTextArea";
import VacancyMultySelectContainer from "./VacancyMultySelectContainer";
import React from "react";
import { Xmark } from "iconoir-react";

interface VacancyActionModalProps {
  open: boolean;
  handler: () => void;
  modalType: "create" | "edit";
  activeVacancy: Vacancy | null;
  onSubmit: (data: Vacancy) => Promise<void>;
}

export function VacancyActionModal({
  open,
  handler,
  modalType,
  activeVacancy,
  onSubmit,
}: VacancyActionModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Vacancy>({
    defaultValues: {
      title: "",
      description: "",
      education: "",
      experience: "",
      skills: [],
    },
  });

  React.useEffect(() => {
    if (open) {
      if (activeVacancy) {
        const sanitizedVacancy = {
          title: activeVacancy.title || "",
          description: activeVacancy.description || "",
          education: activeVacancy.education || "",
          experience: activeVacancy.experience || "",
          skills: Array.isArray(activeVacancy.skills)
            ? activeVacancy.skills.map((skill) => ({
                skillId: skill.skillId || "",
                title: skill.title || "",
                level: skill.level || 1,
                experience: skill.experience || 1,
              }))
            : [],
        };
        reset(sanitizedVacancy);
      } else {
        reset({
          title: "",
          description: "",
          education: "",
          experience: "",
          skills: [],
        });
      }
    }
  }, [open, activeVacancy, reset]);

  return (
    <BaseModal open={open} handler={handler}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#333333]">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-[#E0E0E0]">
          {modalType === "create" ? "Create vacancy" : "Edit vacancy"}
        </h3>
        <button
          type="button"
          onClick={handler}
          className="p-1 hover:bg-gray-100/70 dark:hover:bg-[#3A3A3A]/70 rounded-full transition-colors text-gray-500 dark:text-[#AAAAAA] hover:text-[#01B399]"
          aria-label="Close modal"
        >
          <Xmark strokeWidth={2} className="h-5 w-5" />
        </button>
      </div>
      <DialogBody
        className="max-h-[42rem] overflow-y-auto dark:bg-[#2A2A2A]"
        divider={false}
        {...materialProps<ComponentProps<typeof DialogBody>>()}
      >
        <div className="dark:text-gray-300">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputContainer>
              <FormInput<Vacancy>
                name="title"
                label="Name"
                type="text"
                placeholder="Vacancy name"
                control={control}
                rules={{ required: "Please enter vacancy name" }}
              />
            </FormInputContainer>
            <FormInputContainer>
              <FormTextArea
                name="description"
                label="Description"
                placeholder="Vacancy description"
                control={control}
                rules={{
                  required: "Please enter vacancy description",
                  min: {
                    value: 10,
                    message: "Experience level must be at least 10",
                  },
                  max: {
                    value: 2000,
                    message: "Experience level must be at most 50",
                  },
                }}
              />
            </FormInputContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <FormInputContainer>
                <FormInput<Vacancy>
                  name="education"
                  label="Education"
                  placeholder="Education"
                  control={control}
                  rules={{ required: "Please select education level" }}
                />
              </FormInputContainer>
              <FormInputContainer>
                <FormInput<Vacancy>
                  name="experience"
                  label="Experience Level"
                  placeholder="Experience level"
                  control={control}
                  rules={{
                    required: "Please select experience level",
                    min: {
                      value: 1,
                      message: "Experience level must be at least 1",
                    },
                    max: {
                      value: 50,
                      message: "Experience level must be at most 50",
                    },
                  }}
                />
              </FormInputContainer>
            </div>

            <div className="mt-6">
              {modalType === "create" && (
                <VacancyMultySelectContainer
                  control={control}
                  name="skills"
                  skillsPath="/skills/v1/skill/get-all"
                  modalType={modalType}
                />
              )}
            </div>
          </form>
        </div>
      </DialogBody>
      <div className="flex justify-end gap-2 p-4">
        <button
          type="button"
          onClick={handler}
          disabled={isSubmitting}
          className="px-4 py-2 text-red-500 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-[#01B399] text-white hover:bg-[#019d87] rounded-lg transition-colors disabled:opacity-50 dark:disabled:opacity-40"
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting
            ? "Saving..."
            : modalType === "create"
              ? "Create"
              : "Save"}
        </button>
      </div>
    </BaseModal>
  );
}
