import React from "react";
import { useDashboard } from "./hooks/useDashboard";
import StatCard from "./components/StatCard";
import ResumePreview from "./components/ResumePreview";
import VacancyPreview from "./components/VacancyPreview";
import Loader from "../../components/ui/loader/Loader";
import {
  DocumentTextIcon,
  BriefcaseIcon,
  TagIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const Dashboard: React.FC = () => {
  const { stats, resumes, vacancies, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <Loader loading={loading} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 dark:bg-[#333] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to Evalix HR Assistant</p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-700 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400 dark:text-red-500"
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
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Resumes"
          value={stats.totalResumes}
          icon={<DocumentTextIcon className="h-6 w-6 text-blue-600" />}
          description="Uploaded resumes"
          bgColor="bg-white"
          textColor="text-blue-600"
        />
        <StatCard
          title="Total Vacancies"
          value={stats.totalVacancies}
          icon={<BriefcaseIcon className="h-6 w-6 text-indigo-600" />}
          description="Active job positions"
          bgColor="bg-white"
          textColor="text-indigo-600"
        />
        <StatCard
          title="Unique Skills"
          value={stats.totalSkills}
          icon={<TagIcon className="h-6 w-6 text-green-600" />}
          description="Required across all vacancies"
          bgColor="bg-white"
          textColor="text-green-600"
        />
        <StatCard
          title="Recent Activity"
          value={stats.recentActivity}
          icon={<BoltIcon className="h-6 w-6 text-amber-600" />}
          description="New items in last 30 days"
          trend={{
            value: 12,
            isPositive: true,
          }}
          bgColor="bg-white"
          textColor="text-amber-600"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumes Section */}
        <ResumePreview resumes={resumes} limit={4} />

        {/* Vacancies Section */}
        <VacancyPreview vacancies={vacancies} limit={4} />
      </div>
    </div>
  );
};

export default Dashboard;
