import React from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  AcademicCapIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Vacancy } from "../../vacancy/service/type";
import { Link } from "react-router-dom";

interface VacancyPreviewProps {
  vacancies: Vacancy[];
  limit?: number;
}

const VacancyPreview: React.FC<VacancyPreviewProps> = ({
  vacancies,
  limit = 3,
}) => {
  const limitedVacancies = vacancies.slice(0, limit);

  const truncateDescription = (
    text: string,
    maxLength: number = 100
  ): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="bg-white dark:bg-[#424242] rounded-xl shadow-md overflow-hidden p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Recent Vacancies
        </h2>
        <Link
          to="/vacancy"
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-medium"
        >
          View all
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </Link>
      </div>

      {limitedVacancies.length === 0 ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <BriefcaseIcon className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" />
          <p className="mt-2">No vacancies found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {limitedVacancies.map((vacancy) => (
            <div
              key={vacancy.id}
              className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
            >
              <div className="flex flex-col">
                <div className="flex items-start mb-2">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-4">
                    <BriefcaseIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {vacancy.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {vacancy.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill.skillId}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300"
                        >
                          {skill.title}
                        </span>
                      ))}
                      {vacancy.skills.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                          +{vacancy.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  {truncateDescription(vacancy.description)}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-4 w-4 mr-1" />
                    <span>{vacancy.education}</span>
                  </div>

                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>
                      {vacancy.createdAt
                        ? new Date(vacancy.createdAt).toLocaleDateString()
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

export default VacancyPreview;
