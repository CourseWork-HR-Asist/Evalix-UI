import React from "react";
import {
  DocumentIcon,
  UserIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Resume } from "../../resume/service/type";
import { Link } from "react-router-dom";

interface ResumePreviewProps {
  resumes: Resume[];
  limit?: number;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumes,
  limit = 3,
}) => {
  const limitedResumes = resumes.slice(0, limit);

  return (
    <div className="bg-white dark:bg-[#424242] rounded-xl shadow-md overflow-hidden p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Recent Resumes
        </h2>
        <Link
          to="/resumes"
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-medium"
        >
          View all
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </Link>
      </div>

      {limitedResumes.length === 0 ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <DocumentIcon className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" />
          <p className="mt-2">No resumes found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {limitedResumes.map((resume) => (
            <div
              key={resume.id}
              className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
            >
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                  <DocumentIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {resume.originalFileName}
                  </h3>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <UserIcon className="h-4 w-4 mr-1" />
                    <span className="truncate">
                      {resume.user?.email || "Unknown user"}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>
                      {resume.createdAt
                        ? new Date(resume.createdAt).toLocaleDateString()
                        : "No date"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
