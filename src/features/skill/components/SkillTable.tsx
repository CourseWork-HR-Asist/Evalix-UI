import { useState } from "react";
import { Skill } from "../services/type";
import { EditPencil, Trash, Xmark } from "iconoir-react";
import BaseModal from "../../../components/modals/BaseModal";

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
      <BaseModal
        open={deleteModalOpen}
        handler={() => setDeleteModalOpen(false)}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#333333]">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-[#E0E0E0]">
            Delete confirmation
          </h3>
          <button
            type="button"
            onClick={() => setDeleteModalOpen(false)}
            className="p-1 hover:bg-gray-100/70 dark:hover:bg-[#3A3A3A]/70 rounded-full transition-colors text-gray-500 dark:text-[#AAAAAA] hover:text-[#01B399]"
          >
            <Xmark strokeWidth={2} className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 border-b border-gray-200 dark:border-[#333333]">
          <p className="text-gray-800 dark:text-[#E0E0E0]">
            Are you sure you want to delete this skill? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-end gap-2 p-4">
          <button
            type="button"
            onClick={() => setDeleteModalOpen(false)}
            className="px-4 py-2 text-red-500 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="px-4 py-2 bg-[#01B399] text-white hover:bg-[#019d87] rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default SkillTable;
