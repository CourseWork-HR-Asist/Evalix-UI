import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Skill } from "../services/type";
import { skillService } from "../services/skill.service";

type SkillState = {
  list: Skill[];
  loading: boolean;
  error: string | null;
};

const initialState: SkillState = {
  list: [],
  loading: false,
  error: null,
};

const fetchSkills = createAsyncThunk<Skill[]>(
  "skills/fetchAll",
  async () => {
    return await skillService.getAll();
  }
);

const createSkill = createAsyncThunk<Skill, Skill>(
  "skills/create",
  async (data) => {
    return await skillService.create(data);
  }
);

const updateSkill = createAsyncThunk<Skill, Skill>(
  "skills/update",
  async (data) => {
    return await skillService.update(data);
  }
);

const deleteSkill = createAsyncThunk<string, string>(
  "skills/delete",
  async (id) => {
    await skillService.remove(id);
    return id;
  }
);

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch skills";
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default skillSlice.reducer;

export {
    fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill,
};


