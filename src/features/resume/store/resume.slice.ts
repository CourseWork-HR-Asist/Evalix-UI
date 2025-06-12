import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Resume } from "../service/type";
import { createResumeService } from "../service/resume.service";

type ResumeState = {
  list: Resume[];
  loading: boolean;
  error: string | null;
};

const initialState: ResumeState = {
  list: [],
  loading: false,
  error: null,
};

const fetchResumes = createAsyncThunk<Resume[]>(
  "resumes/fetchAll",
  async (_, { signal }) => {
    const resumeService = createResumeService(signal);
    return await resumeService.getAll();
  }
);

const fetchResumeByUserId = createAsyncThunk<Resume[], string>(
  "resumes/fetchByUserId",
  async (userId, { signal }) => {
    const resumeService = createResumeService(signal);
    return await resumeService.getByUserId(userId);
  }
);

const createResume = createAsyncThunk<Resume, { file: File, userId: string }>(
  "resumes/create",
  async ({ file, userId }, { signal }) => {
    const resumeService = createResumeService(signal);
    return await resumeService.create(file, userId);
  }
);

const deleteResume = createAsyncThunk<string, string>(
  "resumes/delete",
  async (id, { signal }) => {
    const resumeService = createResumeService(signal);
    await resumeService.remove(id);
    return id;
  }
);

const resumeSlice = createSlice({
  name: "resumes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch resumes";
      })
      .addCase(fetchResumeByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResumeByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchResumeByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch resume by user ID";
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r.id !== action.payload);
      });
  },
});

export default resumeSlice.reducer;

export {
  fetchResumes,
  fetchResumeByUserId,
  createResume,
  deleteResume,
};
