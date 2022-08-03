import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SIGHT_MODAL_STATUS } from "../constants";
import { Sight } from "../interfaces/common";
import { fakeResp } from "../utils/mocks";
import { newSightState } from "./interfaces";


const initialState: newSightState = {
  showSightModal: false,
  error: false,
  newSight: null,
  mySights:[],
  modalStatus: SIGHT_MODAL_STATUS.NEW,
};

export const createSight = createAsyncThunk<{ sight: Sight }, { sight: Sight }>(
  "createSight",
  async ({sight}) => {
    console.log(sight);
    const response = await fakeResp(true, 1000);
    if (response.success) {
      return {
        sight,
        // newSight: response.body ?? [],
      };
    } else {
      throw "Error creating sight";
    }
  }
);

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
      });
  },
});

export const { openModal, closeModal } = sightSlice.actions;
export default sightSlice.reducer;