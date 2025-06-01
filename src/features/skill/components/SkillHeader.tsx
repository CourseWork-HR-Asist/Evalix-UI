import { UserPlus } from "iconoir-react";
import { Typography } from "@material-tailwind/react";
import ActionButton from "../../../components/ui/buttons/ActionButton";

interface SkillHeaderProps {
  onAddClick: () => void;
}

export const SkillHeader: React.FC<SkillHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="mb-8 flex items-center justify-between gap-8">
      <div className="dark:text-gray-100">
        <Typography variant="h3" className="dark:text-white">Skills list</Typography>
        <Typography variant="h5" className="mt-1 dark:text-brand-100/80 font-medium">List of all skills in the system</Typography>
      </div>
      <ActionButton onClick={onAddClick}>
        <UserPlus strokeWidth={2} className="h-5 w-5 md:h-4 md:w-4" /> 
        <Typography variant="small" className="whitespace-nowrap">Add skill</Typography>
      </ActionButton>
    </div>
  );
}; 