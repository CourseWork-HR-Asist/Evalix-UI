import FormInput from "../../../components/form/FormInput";
import { useForm } from "react-hook-form";
import { Skill } from "../services/type";
import React from "react";
import { Xmark } from "iconoir-react";
import BaseModal from "../../../components/ui/modals/BaseModal";
import { FormInputContainer } from "../../../components/form/containers/FormInputContainer";

interface SkillModalProps {
  open: boolean;
  onClose: () => void;
  modalType: "create" | "edit";
  activeSkill: Skill | null;
  onSubmit: (data: Skill) => Promise<void>;
}

export const SkillModal: React.FC<SkillModalProps> = ({
  open,
  onClose,
  modalType,
  activeSkill,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Skill>({
    defaultValues: {
      title: "",
      ...(activeSkill || {}),
    },
  });

  React.useEffect(() => {
    if (open) {
      reset(activeSkill || { title: "" });
    }
  }, [open, activeSkill, reset]);

  return (
    <BaseModal open={open} handler={onClose}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#333333]">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-[#E0E0E0]">
          {modalType === "create" ? "Create skill" : "Edit skill"}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="p-1 hover:bg-gray-100/70 dark:hover:bg-[#3A3A3A]/70 rounded-full transition-colors text-gray-500 dark:text-[#AAAAAA] hover:text-[#01B399]"
          aria-label="Close modal"
        >
          <Xmark strokeWidth={2} className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputContainer>
          <FormInput<Skill>
            name="title"
            type="text"
            placeholder="Skill name"
            control={control}
            rules={{ required: "Please enter skill name" }}
          />
        </FormInputContainer>
        <div className="flex justify-end gap-2 p-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-red-500 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#01B399] text-white hover:bg-[#019d87] rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : modalType === "create"
                ? "Create"
                : "Save"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};
