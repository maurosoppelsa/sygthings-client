import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SIGHT_MODAL_STATUS } from "../constants";
import { Sight } from "../interfaces/common";
import SightService from "../services/sight.service";
import { newSightState } from "./interfaces";


const initialState: newSightState = {
  showSightModal: false,
  error: false,
  loading: false,
  newSight: null,
  mySights: [],
  modalStatus: SIGHT_MODAL_STATUS.NEW,
  showImageOptionsModal: false,
  currentSights: [],
};

const sightService: SightService = SightService.getInstance();

export const createSight = createAsyncThunk<{ sight: Sight }, { sight: Sight }>(
  "createSight",
  async ({ sight }) => {
    const response = await sightService.createSight(sight);
    if (response) {
      return {
        sight: response.data,
      };
    } else {
      throw "Error creating sight";
    }
  }
);

export const getCurrentSights = createAsyncThunk<{ sights: Sight[] }, string>(
  "getCurrentSights",
  async (userId) => {
    const response = await sightService.getAllSights(userId);
    if (response.data.length !== 0) {
      return {
        sights: response.data,
      };
    } else {
      throw "Error getting sights";
    }
  }
);

export const getSightsByUser = createAsyncThunk<{ sights: Sight[] }, string>(
  "getSightsByUser",
  async (userId) => {
    const response = await sightService.getSightsByUser(userId);
    if (response.data.length !== 0) {
      return {
        sights: response.data,
      };
    } else {
      throw "Error getting sights";
    }
  }
);

export const deleteSight = createAsyncThunk<{ sight: Sight }, string | undefined>(
  "deleteSight",
  async (sightId) => {
    if (!sightId) {
      throw "could't find sight";
    }
    const response = await sightService.deleteSight(sightId);
    if (response.success) {
      return {
        sight: response.data,
      };
    } else {
      throw "Error deleting sight";
    }
  });

  export const editSight = createAsyncThunk<{ sight: Sight }, Sight>(
    "editSight",
    async (sight) => {
        const response = await sightService.updateSight(sight);
        if (response) {
            return {
                sight: response.data,
            };
        } else {
            throw "Error updating sight";
        }
    });

export const resetSights = createAsyncThunk("resetSights", async () => {
  return;
});


const sightSlice = createSlice({
  name: "sightSlice",
  initialState,
  reducers: {
    openModal: (state: any) => {
      state.showSightModal = true;
    },
    closeModal: (state: any) => {
      state.showSightModal = false;
      state.modalStatus = SIGHT_MODAL_STATUS.NEW;
    },
    toggleImageOptionsModal: (state: any) => {
      state.showImageOptionsModal = !state.showImageOptionsModal;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSight.pending, (state) => {
        state.modalStatus = SIGHT_MODAL_STATUS.PENDING;
        state.error = false;
      })
      .addCase(createSight.fulfilled, (state, action) => {
        state.newSight = action.payload.sight;
        state.modalStatus = SIGHT_MODAL_STATUS.SUCCESS;
        state.mySights = [action.payload.sight, ...state.mySights];
      })
      .addCase(createSight.rejected, (state) => {
        state.error = true;
        state.modalStatus = SIGHT_MODAL_STATUS.FAILED;
      })
      .addCase(getCurrentSights.pending, (state) => {
        state.error = false;
      })
      .addCase(getCurrentSights.fulfilled, (state, action) => {
        state.error = false;
        state.currentSights = action.payload.sights;
      })
      .addCase(getCurrentSights.rejected, (state) => {
        state.error = true;
      })
      .addCase(getSightsByUser.pending, (state) => {
        state.error = false;
      })
      .addCase(getSightsByUser.fulfilled, (state, action) => {
        state.error = false;
        state.mySights = action.payload.sights;
      })
      .addCase(getSightsByUser.rejected, (state) => {
        state.error = true;
      })
      .addCase(resetSights.fulfilled, (state) => {
        state.currentSights = [];
        state.mySights = [];
      })
      .addCase(deleteSight.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteSight.fulfilled, (state, action) => {
        state.error = false;
        state.mySights = state.mySights.filter((sight: Sight) => sight?.id !== action.payload.sight?.id);
      })
      .addCase(deleteSight.rejected, (state) => {
        state.error = true;
      })
      .addCase(editSight.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(editSight.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.mySights = state.mySights.map((sight) =>
          sight?.id === action.payload.sight?.id ? action.payload.sight : sight
        );
      })      
      .addCase(editSight.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { openModal, closeModal, toggleImageOptionsModal } = sightSlice.actions;
export default sightSlice.reducer;