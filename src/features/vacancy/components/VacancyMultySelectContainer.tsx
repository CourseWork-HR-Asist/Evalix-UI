import { useFieldArray, Control } from "react-hook-form";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import FormApiSelect from "../../../components/form/FormApiSelect";
import FromSelect from "../../../components/form/FromSelect";
import FormInput from "../../../components/form/FormInput";
import { FormInputContainer } from "../../../components/form/containers/FormInputContainer";
import { Skill } from "../../skill/services/type";
import { Vacancy, levelOptions } from "../service/type";

interface VacancyMultySelectContainerProps {
  control: Control<Vacancy>;
  name: "skills";
  skillsPath: string;
  modalType?: "create" | "edit";
}

function VacancyMultySelectContainer({
  control,
  name,
  skillsPath,
  modalType = "create",
}: VacancyMultySelectContainerProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAddSkill = () => {
    append({
      skillId: "",
      title: "",
      level: 1,
      experience: 1,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Required Skills</h3>
        <button
          type="button"
          onClick={handleAddSkill}
          className="flex items-center text-[#01B399] hover:text-[#018e7a] transition-colors"
        >
          <PlusCircleIcon className="h-5 w-5 mr-1" />
          {modalType === "create" ? "Add Skill" : "Edit Skill"}
        </button>
      </div>

      {fields.length === 0 && (
        <div className="text-gray-500 dark:text-gray-400 text-center py-4 border border-dashed dark:border-gray-600 rounded-lg">
          No skills added yet. Click "Add Skill" to start.
        </div>
      )}

      {fields.length > 0 && (
        <div className="space-y-2 max-h-[20rem] overflow-y-auto pr-1">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-12 gap-2 items-start p-2 bg-gray-50 dark:bg-[#333] rounded-lg"
            >
              <div className="col-span-5">
                <FormInputContainer>
                  <FormApiSelect<Vacancy, Skill>
                    name={`skills.${index}.skillId`}
                    label="Skill"
                    placeholder="Select skill"
                    control={control}
                    path={skillsPath}
                    rules={{ required: "Skill is required" }}
                    mapOption={(option) => ({
                      label: option.title,
                      value: option.id,
                    })}
                  />
                </FormInputContainer>
              </div>
              <div className="col-span-3">
                <FormInputContainer>
                  <FromSelect
                    name={`skills.${index}.level`}
                    label="Level"
                    placeholder="Select level"
                    control={control}
                    options={levelOptions}
                    rules={{ required: "Level is required" }}
                  />
                </FormInputContainer>
              </div>
              <div className="col-span-3">
                <FormInputContainer>
                  <FormInput
                    name={`skills.${index}.experience`}
                    label="Experience"
                    type="number"
                    placeholder="Enter years of experience"
                    control={control}
                    rules={{
                      required: "Experience is required",
                      min: { value: 0, message: "Cannot be negative" },
                      valueAsNumber: true,
                    }}
                  />
                </FormInputContainer>
              </div>
              <div className="col-span-1 pt-8">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VacancyMultySelectContainer;
