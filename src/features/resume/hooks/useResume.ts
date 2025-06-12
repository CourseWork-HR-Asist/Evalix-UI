import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import {
    fetchResumes,
    fetchResumeByUserId,
    createResume,
    deleteResume,
} from "../store/resume.slice";
import { Resume } from "../service/type";
import { useCallback } from "react";

export const useResumeSlice = () => {
    const dispatch = useAppDispatch();
    const resumes = useAppSelector((state: { resumes: { list: Resume[] } }) => state.resumes.list);
    const loading = useAppSelector((state: { resumes: { loading: boolean } }) => state.resumes.loading);
    const error = useAppSelector((state: { resumes: { error: string | null } }) => state.resumes.error);
  
    const getResumes = useCallback(() => dispatch(fetchResumes()), [dispatch]);
    const getResumeByUserId = useCallback((userId: string) => dispatch(fetchResumeByUserId(userId)), [dispatch]);
    const removeResume = useCallback((id: string) => dispatch(deleteResume(id)), [dispatch]);
    const getResumesByUserId = useCallback((userId: string) => resumes.filter((resume: Resume) => resume.userId === userId), [resumes]); 
  
    const uploadResume = useCallback(async (
      file: File,
      userId: string,
      onSuccess?: (resumeId: string) => void
    ) => {
      try {
        const response = await dispatch(createResume({ file, userId }));
        if (createResume.fulfilled.match(response)) {
          onSuccess?.(response.payload.id);
          return response.payload.id;
        } else {
          throw new Error(response.error?.message || "Upload failed");
        }
      } catch (err) {
        console.error("Error uploading resume:", err);
        throw err;
      }
    }, [dispatch]);
  
    return {
      resumes,
      loading,
      error,
      getResumes,
      getResumeByUserId,
      removeResume,
      getResumesByUserId,
      uploadResume,
    };
  };