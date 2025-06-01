import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Evaluation, CreateEvaluation } from "../service/type";
import { createEvaluationService } from "../service/evaluation.service";

type EvaluationState = {
  list: Evaluation[];
  loading: boolean;
  error: string | null;
};

const initialState: EvaluationState = {
  list: [],
  loading: false,
  error: null,
};

const fetchEvaluations = createAsyncThunk<Evaluation[]>(
  "evaluations/fetchAll",
  async (_, { signal }) => {
    const evaluationService = createEvaluationService(signal);
    return await evaluationService.getAll();
  }
);

const fetchEvaluationsByVacancyId = createAsyncThunk<Evaluation[], string>(
  "evaluations/fetchByVacancyId",
  async (vacancyId, { signal }) => {
    const evaluationService = createEvaluationService(signal);
    return await evaluationService.getByVacancyId(vacancyId);
  }
);

const fetchEvaluationsByResumeId = createAsyncThunk<Evaluation[], string>(
  "evaluations/fetchByResumeId",
  async (resumeId, { signal }) => {
    const evaluationService = createEvaluationService(signal);
    return await evaluationService.getByResumeId(resumeId);
  }
);

const createEvaluation = createAsyncThunk<Evaluation, CreateEvaluation>(
  "evaluations/create",
  async (data, { signal }) => {
    const evaluationService = createEvaluationService(signal);
    return await evaluationService.create(data);
  }
);

const deleteEvaluation = createAsyncThunk<string, string>(
  "evaluations/delete",
  async (id, { signal }) => {
    const evaluationService = createEvaluationService(signal);
    await evaluationService.remove(id);
    return id;
  }
);

const evaluationSlice = createSlice({
  name: "evaluations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvaluations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvaluations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEvaluations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch evaluations";
      })
      .addCase(fetchEvaluationsByVacancyId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvaluationsByVacancyId.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEvaluationsByVacancyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch evaluations by vacancy ID";
      })
      .addCase(fetchEvaluationsByResumeId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvaluationsByResumeId.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEvaluationsByResumeId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch evaluations by resume ID";
      })
      .addCase(createEvaluation.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteEvaluation.fulfilled, (state, action) => {
        state.list = state.list.filter((e) => e.id !== action.payload);
      });
  },
});

export default evaluationSlice.reducer;

export {
    fetchEvaluations,
    fetchEvaluationsByVacancyId,
    fetchEvaluationsByResumeId,
    createEvaluation,
    deleteEvaluation,
};
