import { useState, useEffect } from 'react';
import { useResumeSlice } from '../../resume/hooks/useResume';
import { useVacancySlice } from '../../vacancy/hooks/useVacancy';
import { Resume } from '../../resume/service/type';
import { Vacancy } from '../../vacancy/service/type';

interface DashboardStats {
  totalResumes: number;
  totalVacancies: number;
  totalSkills: number;
  recentActivity: number;
}

interface UseDashboardResult {
  stats: DashboardStats;
  resumes: Resume[];
  vacancies: Vacancy[];
  loading: boolean;
  error: string | null;
}

export const useDashboard = (): UseDashboardResult => {
  const { resumes, loading: resumesLoading, error: resumesError, getResumes } = useResumeSlice();
  const { vacancies, loading: vacanciesLoading, error: vacanciesError, getVacancies } = useVacancySlice();
  const [stats, setStats] = useState<DashboardStats>({
    totalResumes: 0,
    totalVacancies: 0,
    totalSkills: 0,
    recentActivity: 0
  });

  useEffect(() => {
    getResumes();
    getVacancies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resumes && vacancies) {
      const uniqueSkills = new Set<string>();
      vacancies.forEach((vacancy: Vacancy) => {
        vacancy.skills.forEach((skill: { skillId: string }) => {
          uniqueSkills.add(skill.skillId);
        });
      });
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentResumes = resumes.filter((resume: Resume) => 
        new Date(resume.createdAt) >= thirtyDaysAgo
      );
      
      const recentVacancies = vacancies.filter((vacancy: Vacancy) => 
        new Date(vacancy.createdAt) >= thirtyDaysAgo
      );

      setStats({
        totalResumes: resumes.length,
        totalVacancies: vacancies.length,
        totalSkills: uniqueSkills.size,
        recentActivity: recentResumes.length + recentVacancies.length
      });
    }
  }, [resumes, vacancies]);

  return {
    stats,
    resumes,
    vacancies,
    loading: resumesLoading || vacanciesLoading,
    error: resumesError || vacanciesError
  };
};
