import ReactMarkdown from "react-markdown";
import { Vacancy } from "../service/type";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

interface VacancyCardProps {
  vacancy: Vacancy;
  onClick?: () => void;
  className?: string;
}

const VacancyCard = ({
  vacancy,
  onClick,
  className = "",
}: VacancyCardProps) => {
  return (
    <div
      className={`bg-white dark:bg-[#2A2A2A] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div className="sm:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {vacancy.title}
              </h3>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1 text-sm">
                <CalendarIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {vacancy.createdAt
                    ? new Date(vacancy.createdAt).toLocaleDateString()
                    : "No date"}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1 text-sm">
                <UserCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {vacancy.user && vacancy.user.username
                    ? vacancy.user.username
                    : "Unknown author"}
                </span>
              </div>
            </div>

            {vacancy.skills &&
              Array.isArray(vacancy.skills) &&
              vacancy.skills.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Required Skills:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {vacancy.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full"
                      >
                        {skill.title}
                      </span>
                    ))}
                    {vacancy.skills.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        +{vacancy.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
          </div>

          <div className="sm:col-span-3 mt-4 sm:mt-0">
            <div className="mb-3">
              <div className="flex items-start mb-1">
                <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Education:
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-300 break-words">
                    {vacancy.education}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-start mb-1">
                <BriefcaseIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Experience:
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-300 break-words">
                    {vacancy.experience}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
                  Description:
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  <ReactMarkdown>{vacancy.description || ""}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;
