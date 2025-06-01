import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VacancySkill, Vacancy, VacancySlice, VacancySkillCreate, VacancySkillUpdate } from "../service/type";
import { createVacancyService } from "../service/vacancy.service";

interface VacancyState {
    list: Vacancy[];
    currentVacancy: Vacancy | null;
    loading: boolean;
    error: string | null;
}

const initialState: VacancyState = {
    list: [],
    currentVacancy: null,
    loading: false,
    error: null,
}

const fetchVacancies = createAsyncThunk<Vacancy[], void>(
    VacancySlice.getAll,
    async (_, { signal }) => {
      const service = createVacancyService(signal);
      return await service.getAll();
    }
);

const fetchVacancyById = createAsyncThunk<Vacancy, string>(
    VacancySlice.getById,
    async (id, { signal }) => {
      const service = createVacancyService(signal);
      return await service.getById(id);
    }
);

const createVacancy = createAsyncThunk<Vacancy, Vacancy>(
    VacancySlice.create,
    async (data, { signal }) => {
      const service = createVacancyService(signal);
      return await service.create(data);
    }
);

const updateVacancy = createAsyncThunk<Vacancy, Vacancy>(
    VacancySlice.update,
    async (data, { signal }) => {
      const service = createVacancyService(signal);
      return await service.update(data);
    }
);

const deleteVacancy = createAsyncThunk<string, string>(
    VacancySlice.delete,
    async (id, { signal }) => {
      const service = createVacancyService(signal);
      await service.delete(id);
      return id;
    }
);

const updateVacancySkill = createAsyncThunk<VacancySkill, VacancySkillUpdate>(
    VacancySlice.updateSkill,
    async (data, { signal }) => {
        const service = createVacancyService(signal);
        return await service.updateVacancySkill(data);
    }
)

const deleteVacancySkill = createAsyncThunk<string, string>(
    VacancySlice.deleteSkill,
    async (id, { signal }) => {
        const service = createVacancyService(signal);
        await service.deleteVacancySkill(id);
        return id;
    }
)

const addVacancySkill = createAsyncThunk<VacancySkill, VacancySkillCreate>(
    VacancySlice.addSkill,
    async (data, { signal }) => {
        const service = createVacancyService(signal);
        return await service.addVacancySkill(data);
    }
)


const vacancySlice = createSlice({
    name: "vacancies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVacancies.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchVacancies.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
            state.error = null;
        })
        builder.addCase(fetchVacancies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch vacancies';
        })

        builder.addCase(fetchVacancyById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchVacancyById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentVacancy = action.payload;
            
            // Also update in list if present
            const index = state.list.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
            
            state.error = null;
        })
        builder.addCase(fetchVacancyById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch vacancy';
        })

        builder.addCase(createVacancy.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createVacancy.fulfilled, (state, action) => {
            state.loading = false;
            state.list.push(action.payload);
            state.error = null;
        })
        builder.addCase(createVacancy.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to create vacancy';
        })

        builder.addCase(updateVacancy.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(updateVacancy.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.list.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
            state.error = null;
        })
        builder.addCase(updateVacancy.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update vacancy';
        })

        builder.addCase(deleteVacancy.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteVacancy.fulfilled, (state, action) => {
            state.loading = false;
            state.list = state.list.filter(item => item.id !== action.payload);
            state.error = null;
        })
        builder.addCase(deleteVacancy.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to delete vacancy';
        })
        builder.addCase(updateVacancySkill.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(updateVacancySkill.fulfilled, (state, action) => {
            state.loading = false;
            
            // Update in the list
            const index = state.list.findIndex(item => item.skills && item.skills.some(skill => skill.id === action.payload.id));
            if (index !== -1) {
                state.list[index].skills = state.list[index].skills.map(skill => skill.id === action.payload.id ? action.payload : skill);
            }
            
            // Also update in currentVacancy if it's the same vacancy
            if (state.currentVacancy && state.currentVacancy.skills && 
                state.currentVacancy.skills.some(skill => skill.id === action.payload.id)) {
                state.currentVacancy.skills = state.currentVacancy.skills.map(
                    skill => skill.id === action.payload.id ? action.payload : skill
                );
            }
            
            state.error = null;
        })
        builder.addCase(updateVacancySkill.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update vacancy skill';
        })
        builder.addCase(deleteVacancySkill.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteVacancySkill.fulfilled, (state, action) => {
            state.loading = false;
            
            // Update the list
            state.list = state.list.map(item => ({
                ...item,
                skills: item.skills ? item.skills.filter(skill => skill.id !== action.payload) : []
            }));
            
            // Also update currentVacancy if needed
            if (state.currentVacancy && state.currentVacancy.skills) {
                state.currentVacancy.skills = state.currentVacancy.skills.filter(
                    skill => skill.id !== action.payload
                );
            }
            
            state.error = null;
        })
        builder.addCase(deleteVacancySkill.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to delete vacancy skill';
        })
        builder.addCase(addVacancySkill.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(addVacancySkill.fulfilled, (state, action) => {
            state.loading = false;
            
            state.list = state.list.map(item => ({
                ...item,
                skills: item.skills ? [...item.skills, action.payload] : [action.payload]
            }));
            
            if (state.currentVacancy) {
                state.currentVacancy.skills = state.currentVacancy.skills ? [...state.currentVacancy.skills, action.payload] : [action.payload];
            }
            
            state.error = null;
        })
        builder.addCase(addVacancySkill.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to add vacancy skill';
        })
    }
})

export default vacancySlice.reducer;

export const vacancyActions = {
    fetchVacancies,
    fetchVacancyById,
    createVacancy,
    updateVacancy,
    deleteVacancy,
    updateVacancySkill,
    deleteVacancySkill,
    addVacancySkill
};

