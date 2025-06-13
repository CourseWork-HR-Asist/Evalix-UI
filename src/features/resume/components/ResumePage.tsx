import { useEffect, useState, useMemo, ComponentProps } from "react";
import { useResumeSlice } from "../hooks/useResume";
import {
  DocumentIcon,
  TrashIcon,
  UserIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Resume } from "../service/type";
import Loader from "../../../components/ui/loader/Loader";
import { ContentCard } from "../../../components/ui/cards/ContentCard";
import ActionButton from "../../../components/ui/buttons/ActionButton";
import UploadResumeModal from "./UploadResumeModal";
import { useUserSlice } from "../../authorization/hooks/useUser";
import DeleteConfirmationModal from "../../../components/ui/modals/DeleteConfirmationModal";
import { SearchInput } from "../../../components/form/SearchInput";
import { Checkbox, Typography } from "@material-tailwind/react";
import { materialProps } from "../../../components/ui/helpers/materialTailwind";

interface ResumeCardProps {
  resume: Resume;
  onDownload: (url: string) => void;
  onDelete: (id: string) => void;
  isAutor: boolean;
}

const ResumeCard = ({
  resume,
  onDownload,
  onDelete,
  isAutor,
}: ResumeCardProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(resume.id);
    setDeleteModalOpen(false);
  };

  const handleDownload = (url: string) => {
    onDownload(url);
  };

  return (
    <div className="bg-white dark:bg-[#424242] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex flex-col">
          <div className="mb-4">
            <h3
              className="text-xl font-bold text-gray-800 dark:text-white mb-2 truncate"
              title={resume.originalFileName}
            >
              {resume.originalFileName}
            </h3>
            <div className="flex items-center text-gray-400 dark:text-gray-500 mb-1">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {resume.createdAt
                  ? new Date(resume.createdAt).toLocaleDateString()
                  : "No date"}
              </span>
            </div>
            <div className="flex items-center text-gray-400 dark:text-gray-500 mb-1">
              <UserIcon className="h-4 w-4 mr-1" />
              <span
                className="text-sm truncate max-w-[200px] sm:max-w-none"
                title={resume.user?.email}
              >
                {resume.user?.email || "Unknown user"}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-1">
              <DocumentIcon className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Resume File
              </span>
            </div>
            <p
              className="text-sm text-gray-600 dark:text-gray-400 ml-7 truncate"
              title={resume.originalFileName}
            >
              {resume.originalFileName}
            </p>
          </div>

          <div className="flex flex-wrap justify-end gap-2 mt-4">
            <button
              onClick={() => handleDownload(resume.url)}
              className="flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors flex-shrink-0"
              title="Download"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">Download</span>
            </button>
            {isAutor && (
              <button
                onClick={handleDeleteClick}
                className="flex items-center px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors flex-shrink-0"
                title="Delete"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                <span className="text-sm">Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        open={deleteModalOpen}
        handler={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Resume"
        message="Are you sure you want to delete this resume? This action cannot be undone."
      />
    </div>
  );
};

const ResumePage = () => {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const { user } = useUserSlice();
  const { resumes, loading, error, getResumes, removeResume } =
    useResumeSlice();
  const [searchTerm, setSearchTerm] = useState("");
  const [showMyResumes, setShowMyResumes] = useState(false);

  const handleUploadModalOpen = () => {
    setOpenUploadModal(true);
  };

  const handleUploadModalClose = () => {
    setOpenUploadModal(false);
  };

  useEffect(() => {
    getResumes();
  }, [getResumes]);

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  const handleDelete = (id: string) => {
    removeResume(id);
    getResumes();
  };

  const filteredResumes = useMemo(() => {
    return resumes
      .filter((resume) => {
        if (!showMyResumes) return true;
        return resume.userId === user?.id;
      })
      .filter((resume) => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return resume.originalFileName.toLowerCase().includes(searchLower);
      });
  }, [resumes, searchTerm, showMyResumes, user?.id]);

  return (
    <ContentCard className="p-2">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader loading={loading} />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Resumes
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Browse all uploaded resumes
              </p>
            </div>
            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-4 w-full md:w-auto">
              <div className="w-full sm:w-72">
                <SearchInput
                  search={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="my-resumes"
                  checked={showMyResumes}
                  onChange={(e) => setShowMyResumes(e.target.checked)}
                  color="blue"
                  {...materialProps<ComponentProps<typeof Checkbox>>()}
                />
                <Typography
                  variant="small"
                  color="gray"
                  htmlFor="my-resumes"
                  className="font-normal cursor-pointer select-none dark:text-gray-300"
                >
                  Only my resumes
                </Typography>
              </div>
              <ActionButton onClick={handleUploadModalOpen}>
                <PlusIcon className="h-4 w-4 md:h-4 md:w-4" />
                <span>Upload Resume</span>
              </ActionButton>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {filteredResumes.length === 0 ? (
            <ContentCard className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="text-blue-600 dark:text-blue-300 font-medium text-center p-6">
                No resumes found matching your criteria.
              </div>
            </ContentCard>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredResumes.map((resume: Resume) => (
                <ResumeCard
                  key={resume.id}
                  resume={resume}
                  onDownload={handleDownload}
                  onDelete={handleDelete}
                  isAutor={user?.id === resume.userId}
                />
              ))}
            </div>
          )}
        </>
      )}
      <UploadResumeModal
        open={openUploadModal}
        handler={handleUploadModalClose}
      />
    </ContentCard>
  );
};

export default ResumePage;
