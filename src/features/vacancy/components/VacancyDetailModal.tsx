import type { ComponentProps } from "react";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Card,
  CardBody,
  Typography,
  Chip,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { materialProps } from "../../../components/ui/helpers/materialTailwind";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  UserCircleIcon,
  PencilSquareIcon,
  ChartBarIcon,
  ClockIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";

import { useUserSlice } from "../../authorization/hooks/useUser";
import { useVacancySlice } from "../hooks/useVacancy";
import ActionButton from "../../../components/ui/buttons/ActionButton";
import AddEvaluationModal from "../../evaluation/components/AddEvaluationModal";
import { useEvaluationSlice } from "../../evaluation/hooks/useEvaluation";

import BaseModal from "../../../components/ui/modals/BaseModal";
import { Vacancy, levelOptions } from "../service/type";
import { useState, useEffect } from "react";
import DeleteConfirmationModal from "../../../components/ui/modals/DeleteConfirmationModal";
import { Evaluation } from "../../evaluation/service/type";
import EvaluationDetailModal from "./EvaluationDetailModal";
import { getScoreInfo } from "../untils/getScoreInfo";
import VacancySkillModal from "./VacancySkillModal";
import LoadingOverlay from "../../../components/ui/LoadingOverlay"; // Import the new component

interface VacancyDetailModalProps {
  open: boolean;
  handler: () => void;
  vacancy: Vacancy;
  onEdit?: (vacancy: Vacancy) => void;
}

interface VacancyHeaderProps {
  title: string;
  createdAt?: string;
}

interface VacancyInfoProps {
  vacancy: Vacancy;
}

interface VacancySkillsProps {
  skills: Array<{
    id?: string;
    title: string;
    level?: number;
    experience?: number;
  }>;
  isAuthor?: boolean;
  onEditSkill?: (skillIndex: number) => Promise<void>;
  onDeleteSkill?: (skillIndex: number) => Promise<void>;
  onAddSkill?: () => void;
}

interface VacancyDescriptionProps {
  description: string;
}

interface EvaluationsTableProps {
  evaluations: Evaluation[];
  onEvaluationClick: (evaluation: Evaluation) => void;
  truncateText: (text: string, maxLength: number) => string;
}

function VacancyHeader({ title, createdAt }: VacancyHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-3">
        <h2 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
          {title}
        </h2>
        {createdAt && (
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function VacancyInfo({ vacancy }: VacancyInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <UserCircleIcon className="h-5 w-5 text-gray-600 mr-2" />
        <span className="text-gray-700 dark:text-gray-300">
          {vacancy.user && vacancy.user.username
            ? vacancy.user.username
            : "Unknown author"}
        </span>
      </div>

      <div className="bg-gray-50 dark:bg-[#333] p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-2" />
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Education
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 ml-7">
          {vacancy.education}
        </p>
      </div>

      {/* Experience */}
      <div className="bg-gray-50 dark:bg-[#333] p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <BriefcaseIcon className="h-5 w-5 text-blue-600 mr-2" />
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Experience
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 ml-7">
          {vacancy.experience}
        </p>
      </div>
    </div>
  );
}

function VacancySkills({
  skills,
  isAuthor,
  onEditSkill,
  onDeleteSkill,
  onAddSkill,
}: VacancySkillsProps) {
  return (
    <div className="bg-gray-50 dark:bg-[#333] p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-700 dark:text-gray-200">
          Required Skills
        </h3>
        {isAuthor && (
          <Button
            variant="text"
            className="flex items-center gap-1 p-1 text-sm"
            color="blue"
            onClick={onAddSkill}
            {...materialProps<ComponentProps<typeof Button>>()}
          >
            <PlusCircleIcon className="h-4 w-4" />
            Add Skill
          </Button>
        )}
      </div>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {!skills || !Array.isArray(skills) || skills.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            No skills added yet
          </p>
        ) : (
          skills.map((vacancySkill, index) => {
            // Find the level label based on the level value
            const levelLabel =
              levelOptions.find((option) => option.value === vacancySkill.level)
                ?.label || "Not specified";

            return (
              <div
                key={index}
                className="bg-blue-50 dark:bg-gray-800 p-3 rounded-lg border border-blue-100 dark:border-gray-600"
              >
                <div className="font-medium text-blue-700 dark:text-gray-200 mb-2">
                  {vacancySkill.title}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <ChartBarIcon className="h-4 w-4 mr-1 text-blue-500" />
                    <span>Level: {levelLabel}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1 text-blue-500" />
                    <span>
                      Experience: {vacancySkill.experience}{" "}
                      {vacancySkill.experience === 1 ? "year" : "years"}
                    </span>
                  </div>
                </div>
                {isAuthor && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button
                      variant="text"
                      className="flex items-center gap-2 p-2"
                      color="blue"
                      onClick={() => onEditSkill && onEditSkill(index)}
                      {...materialProps<ComponentProps<typeof Button>>()}
                    >
                      <PencilSquareIcon className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="text"
                      className="flex items-center gap-2 p-2"
                      color="red"
                      onClick={() => onDeleteSkill && onDeleteSkill(index)}
                      {...materialProps<ComponentProps<typeof Button>>()}
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// Sub-component: Description with markdown support
function VacancyDescription({ description }: VacancyDescriptionProps) {
  return (
    <div className="bg-gray-50 dark:bg-[#333] p-4 rounded-lg flex flex-col h-full overflow-hidden">
      <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
        Description
      </h3>
      <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
        <ReactMarkdown
          components={{
            strong: (props) => (
              <strong
                className="font-semibold text-gray-800 dark:text-gray-100"
                {...props}
              />
            ),
            li: (props) => (
              <li className="text-gray-600 dark:text-gray-300" {...props} />
            ),
            p: (props) => (
              <p className="text-gray-600 dark:text-gray-300" {...props} />
            ),
          }}
        >
          {description}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// Sub-component: Evaluations table
function EvaluationsTable({
  evaluations,
  onEvaluationClick,
  truncateText,
}: EvaluationsTableProps) {
  return (
    <Card
      className="overflow-auto dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-600 rounded-md shadow-sm"
      {...materialProps<ComponentProps<typeof Card>>()}
    >
      <CardBody
        className="p-0"
        {...materialProps<ComponentProps<typeof CardBody>>()}
      >
        <table className="w-full min-w-max table-auto text-left border-collapse bg-white dark:bg-gray-800/30">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 dark:border-gray-700 bg-blue-gray-50 dark:bg-gray-800 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 dark:text-gray-300"
                >
                  Resume
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 dark:border-gray-700 bg-blue-gray-50 dark:bg-gray-800 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 dark:text-gray-300"
                >
                  Comment
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 dark:border-gray-700 bg-blue-gray-50 dark:bg-gray-800 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 dark:text-gray-300"
                >
                  Score
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 dark:border-gray-700 bg-blue-gray-50 dark:bg-gray-800 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 dark:text-gray-300"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {evaluations && evaluations.length > 0 ? (
              evaluations.map((evaluation) => {
                const { color, icon } = getScoreInfo(evaluation.score);
                return (
                  <tr
                    key={evaluation.id}
                    className="hover:bg-blue-gray-50/50 dark:hover:bg-gray-700/50 cursor-pointer"
                  >
                    <td className="p-4 border-b border-blue-gray-50 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal dark:text-gray-300"
                        >
                          {evaluation.resume?.originalFileName || "Unknown"}
                        </Typography>
                        {evaluation.resume?.url && (
                          <Tooltip content="Download Resume">
                            <a
                              href={evaluation.resume.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                            >
                              <ArrowDownTrayIcon className="h-4 w-4 text-blue-500 cursor-pointer" />
                            </a>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 dark:border-gray-700">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal dark:text-gray-300"
                      >
                        {truncateText(evaluation.comment, 50)}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        {icon}
                        <Chip
                          value={evaluation.score}
                          size="sm"
                          variant="filled"
                          color={color}
                          className="dark:font-medium dark:shadow-md"
                        />
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 dark:border-gray-700">
                      <Tooltip content="View Details">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => onEvaluationClick(evaluation)}
                          {...materialProps<
                            ComponentProps<typeof IconButton>
                          >()}
                        >
                          <EyeIcon className="h-5 w-5 dark:text-gray-400" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center dark:text-gray-400">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    No evaluations found for this vacancy.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export function VacancyDetailModal({
  open,
  handler,
  vacancy,
  onEdit,
}: VacancyDetailModalProps) {
  const { user } = useUserSlice();
  const {
    removeVacancy,
    getVacancies,
    updateVacancySkill,
    removeVacancySkill,
    addVacancySkill,
    getVacancyById,
    currentVacancy,
  } = useVacancySlice();
  const { evaluations, getEvaluationsByVacancyId } = useEvaluationSlice();
  const isAuthor = (user && vacancy.userId === user.id) || false;

  const [selectedEvaluation, setSelectedEvaluation] =
    useState<Evaluation | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);
  const [evaluationDetailOpen, setEvaluationDetailOpen] = useState(false);

  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(
    null
  );
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const [deleteSkillConfirmOpen, setDeleteSkillConfirmOpen] = useState(false);
  const [skillToDeleteIndex, setSkillToDeleteIndex] = useState<number | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false); // State for loader

  const loadingMessages = ["Loading...", "Please wait...", "Almost there..."];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % loadingMessages.length
        );
      }, 2000); // Change message every 2 seconds
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    if (open && vacancy.id) {
      setIsLoading(true); // Show loader
      getEvaluationsByVacancyId(vacancy.id).finally(() => setIsLoading(false)); // Hide loader after fetching
      getVacancyById(vacancy.id).finally(() => setIsLoading(false)); // Hide loader after fetching
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, vacancy.id]);

  const [activeVacancy, setActiveVacancy] = useState<Vacancy>(
    currentVacancy || vacancy
  );

  useEffect(() => {
    if (currentVacancy) {
      setActiveVacancy(currentVacancy);
    }
  }, [currentVacancy]);
  const handleDeleteConfirm = async () => {
    try {
      await removeVacancy(vacancy.id);
      setDeleteConfirmOpen(false);
      handler();
      getVacancies();
    } catch (error) {
      console.error("Error deleting vacancy:", error);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(vacancy);
      handler();
    }
  };

  const handleEvaluationClick = (evaluation: Evaluation) => {
    setSelectedEvaluation(evaluation);
    setEvaluationDetailOpen(true);
  };

  const handleEvaluationDetailClose = () => {
    setEvaluationDetailOpen(false);
    setSelectedEvaluation(null);
  };

  const handleEditSkill = async (skillIndex: number) => {
    setEditingSkillIndex(skillIndex);
    setSkillModalOpen(true);
    return Promise.resolve();
  };

  const handleDeleteSkillConfirm = async () => {
    if (skillToDeleteIndex !== null && activeVacancy.skills) {
      const skillToDelete = activeVacancy.skills[skillToDeleteIndex];
      if (skillToDelete.id) {
        await removeVacancySkill(skillToDelete.id);

        const updatedSkills = activeVacancy.skills.filter(
          (_, index) => index !== skillToDeleteIndex
        );

        setActiveVacancy({
          ...activeVacancy,
          skills: updatedSkills,
        });

        // Refresh from server to ensure consistency
        if (activeVacancy.id) {
          getVacancyById(activeVacancy.id);
        }
      }
    }
    setDeleteSkillConfirmOpen(false);
    setSkillToDeleteIndex(null);
  };

  const handleDeleteSkill = async (skillIndex: number) => {
    setSkillToDeleteIndex(skillIndex);
    setDeleteSkillConfirmOpen(true);
  };

  const handleSkillModalClose = () => {
    setSkillModalOpen(false);
    setEditingSkillIndex(null);
    setIsAddingSkill(false);
  };

  const handleSkillSave = async (updatedSkill: {
    id?: string;
    skillId: string;
    title: string;
    level: number;
    experience: number;
  }) => {
    if (isAddingSkill) {
      // Adding a new skill
      if (!activeVacancy.id) return;

      const newSkill = {
        vacancyId: activeVacancy.id,
        skillId: updatedSkill?.skillId,
        level: updatedSkill.level,
        experience: updatedSkill.experience,
      };

      await addVacancySkill(newSkill);

      const updatedSkills = activeVacancy.skills
        ? [...activeVacancy.skills]
        : [];
      updatedSkills.push({
        skillId: updatedSkill.skillId,
        level: updatedSkill.level,
        experience: updatedSkill.experience,
        title: "",
      });

      setActiveVacancy({
        ...activeVacancy,
        skills: updatedSkills,
      });

      getVacancyById(activeVacancy.id);
    } else if (editingSkillIndex !== null && activeVacancy.skills) {
      const skillToUpdate = activeVacancy.skills[editingSkillIndex];
      if (skillToUpdate.id) {
        const skillUpdate = {
          id: skillToUpdate.id,
          skillId: skillToUpdate.id,
          title: skillToUpdate.title,
          level: updatedSkill.level,
          experience: updatedSkill.experience,
        };

        await updateVacancySkill(skillUpdate);

        const updatedSkills = [...activeVacancy.skills];
        updatedSkills[editingSkillIndex] = {
          ...updatedSkills[editingSkillIndex],
          level: updatedSkill.level,
          experience: updatedSkill.experience,
        };

        setActiveVacancy({
          ...activeVacancy,
          skills: updatedSkills,
        });

        // Also refresh from server to ensure consistency
        if (activeVacancy.id) {
          getVacancyById(activeVacancy.id);
        }
      }
    }

    handleSkillModalClose();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      {isLoading && (
        <LoadingOverlay messages={loadingMessages} currentMessageIndex={currentMessageIndex} />
      )}
      {skillModalOpen && (
        <VacancySkillModal
          open={true}
          onClose={handleSkillModalClose}
          initialSkill={
            !isAddingSkill && activeVacancy.skills && editingSkillIndex !== null
              ? {
                  id: activeVacancy.skills[editingSkillIndex].id,
                  title: activeVacancy.skills[editingSkillIndex].title,
                  level: activeVacancy.skills[editingSkillIndex].level || 1,
                  experience:
                    activeVacancy.skills[editingSkillIndex].experience || 0,
                }
              : undefined
          }
          onSave={handleSkillSave}
        />
      )}
      <BaseModal
        size={"xl"}
        open={open}
        handler={handler}
        className="bg-gray-50 dark:bg-[#1E1E1E] shadow-2xl"
        preventOutsideClose={true}
      >
        <DialogHeader
          className="flex justify-between items-center"
          {...materialProps<ComponentProps<typeof DialogHeader>>()}
        >
          <span className="text-xl font-bold dark:text-gray-100">Detail</span>
          {isAuthor && (
            <div className="flex gap-2">
              <Button
                variant="text"
                className="flex items-center gap-2 p-2"
                color="red"
                onClick={() => setDeleteConfirmOpen(true)}
                {...materialProps<ComponentProps<typeof Button>>()}
              >
                <TrashIcon className="h-4 w-4" />
                Delete
              </Button>
              <Button
                variant="text"
                className="flex items-center gap-2 p-2"
                color="blue"
                onClick={handleEdit}
                {...materialProps<ComponentProps<typeof Button>>()}
              >
                <PencilSquareIcon className="h-4 w-4" />
                Edit
              </Button>
            </div>
          )}
        </DialogHeader>

        <DialogBody
          className="max-h-[70vh] overflow-y-auto"
          divider={false}
          {...materialProps<ComponentProps<typeof DialogBody>>()}
        >
          <div className="space-y-6">
            <VacancyHeader
              title={activeVacancy.title}
              createdAt={
                activeVacancy.createdAt
                  ? new Date(activeVacancy.createdAt).toISOString()
                  : undefined
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <VacancyInfo vacancy={activeVacancy} />
                <VacancySkills
                  skills={activeVacancy.skills || []}
                  onEditSkill={handleEditSkill}
                  onDeleteSkill={handleDeleteSkill}
                  onAddSkill={() => {
                    setIsAddingSkill(true);
                    setSkillModalOpen(true);
                  }}
                  isAuthor={isAuthor}
                />
              </div>
              <VacancyDescription description={activeVacancy.description} />
            </div>
            <div className="mt-8">
              <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-4">
                Evaluations
              </h3>
              <div className="mb-4">
                <ActionButton onClick={() => setEvaluationModalOpen(true)}>
                  Add evaluation
                </ActionButton>
              </div>
              <EvaluationsTable
                evaluations={evaluations}
                onEvaluationClick={handleEvaluationClick}
                truncateText={truncateText}
              />
            </div>
          </div>
        </DialogBody>

        <DialogFooter
          className="space-x-2"
          {...materialProps<ComponentProps<typeof DialogFooter>>()}
        >
          <Button
            variant="text"
            color="blue-gray"
            className="dark:text-gray-300"
            onClick={handler}
            {...materialProps<ComponentProps<typeof Button>>()}
          >
            Close
          </Button>
        </DialogFooter>
      </BaseModal>

      <DeleteConfirmationModal
        open={deleteConfirmOpen}
        handler={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Vacancy Deletion"
        message="Are you sure you want to delete this vacancy? This action cannot be undone."
      />

      <DeleteConfirmationModal
        open={deleteSkillConfirmOpen}
        handler={() => setDeleteSkillConfirmOpen(false)}
        onConfirm={handleDeleteSkillConfirm}
        title="Confirm Skill Deletion"
        message="Are you sure you want to delete this skill? This action cannot be undone."
      />

      {selectedEvaluation && (
        <EvaluationDetailModal
          open={evaluationDetailOpen}
          handler={handleEvaluationDetailClose}
          evaluation={selectedEvaluation}
        />
      )}

      <AddEvaluationModal
        open={evaluationModalOpen}
        handler={() => setEvaluationModalOpen(false)}
        vacancyId={vacancy.id || ""}
        onSuccess={() => vacancy.id && getEvaluationsByVacancyId(vacancy.id)}
      />
    </>
  );
}

export default VacancyDetailModal;

