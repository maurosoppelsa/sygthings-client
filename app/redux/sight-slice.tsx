import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SIGHT_MODAL_STATUS } from "../constants";
import { Sight } from "../interfaces/common";
import SightService from "../services/sight.service";
import { newSightState } from "./interfaces";


const initialState: newSightState = {
  showSightModal: false,
  error: false,
  newSight: null,
  mySights: [],
  modalStatus: SIGHT_MODAL_STATUS.NEW,
  currentSights: [],
};

const sightService: SightService = SightService.getInstance();

export const createSight = createAsyncThunk<{ sight: Sight }, { sight: Sight }>(
  "createSight",
  async ({ sight }) => {
    const response = await sightService.createSight(sight);
    if (response) {
      return {
        sight,
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
        state.mySights = [...state.mySights, action.payload.sight];
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
      });
  },
});

export const { openModal, closeModal } = sightSlice.actions;
export default sightSlice.reducer;