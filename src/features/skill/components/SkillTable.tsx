import { useState } from "react";
import { Skill } from "../services/type";
import { EditPencil, Trash } from "iconoir-react";
import DeleteConfirmationModal from "../../../components/ui/modals/DeleteConfirmationModal";

const TABLE_HEAD = ["Skill", "Actions"];

interface SkillTableProps {
  filteredSkills: Skill[];
  onEdit?: (skill: Skill) => void;
  onDelete?: (id: string) => void;
}

const SkillTable = ({ filteredSkills, onEdit, onDelete }: SkillTableProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSkillToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (skillToDelete && onDelete) {
      onDelete(skillToDelete);
    }
    setDeleteModalOpen(false);
  };
  return (
    <>
      <div className="bg-white dark:bg-[#424242] rounded-lg shadow-md overflow-hidden mt-4 border border-gray-200 dark:border-[#333333]">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-gray-200 dark:border-[#333333] bg-gray-50 dark:bg-[#2E2E2E] p-4"
                >
                  <p className="font-semibold text-sm leading-none text-gray-700 dark:text-[#CCCCCC]">
                    {head}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSkills.map((skill) => {
              const classes = "p-4";

              return (
                <tr
                  key={skill.id}
                  className="hover:bg-gray-50/70 dark:hover:bg-[#3A3A3A]/70 hover:shadow-box transition-colors"
                >
                  <td className={classes}>
                    <p className="font-normal text-sm text-gray-800 dark:text-[#E0E0E0]">
                      {skill.title}
                    </p>
                  </td>
                  <td className={`${classes} flex items-center space-x-2`}>
                    <button
                      type="button"
                      onClick={() => onEdit?.(skill)}
                      className="p-2 rounded-lg text-gray-500 dark:text-[#AAAAAA] hover:text-[#01B399] hover:bg-gray-100/50 dark:hover:bg-[#3A3A3A]/50 transition-colors"
                      title="Edit"
                    >
                      <EditPencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(skill.id)}
                      className="p-2 rounded-lg text-gray-500 dark:text-[#AAAAAA] hover:text-red-500 hover:bg-gray-100/50 dark:hover:bg-[#3A3A3A]/50 transition-colors"
                      title="Delete"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {!filteredSkills.length && (
              <tr>
                <td colSpan={2} className="p-4 text-center">
                  <p className="font-normal text-sm text-gray-500 dark:text-[#777777]">
                    No skills found
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DeleteConfirmationModal
        open={deleteModalOpen}
        handler={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Skill"
        message="Are you sure you want to delete this skill? This action cannot be undone."
      />
    </>
  );
};

export default SkillTable;
