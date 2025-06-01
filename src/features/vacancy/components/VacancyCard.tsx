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
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div
      className={`bg-white dark:bg-[#2A2A2A] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {vacancy.title}
              </h3>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {vacancy.createdAt
                    ? new Date(vacancy.createdAt).toLocaleDateString()
                    : "No date"}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                <UserCircleIcon className="h-4 w-4 mr-1" />
                <span className="text-sm">
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
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Required Skills:</p>
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

          <div className="col-span-3">
            <div className="mb-3">
              <div className="flex items-center mb-1">
                <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Education:</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 ml-7">{vacancy.education}</p>
            </div>

            <div className="mb-3">
              <div className="flex items-center mb-1">
                <BriefcaseIcon className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Experience:</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 ml-7">{vacancy.experience}</p>
            </div>

            <div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
                  Description:
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <ReactMarkdown>
                    {truncateText(vacancy.description || "", 120)}
                  </ReactMarkdown>
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
