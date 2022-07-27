import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SIGHT_MODAL_STATUS } from "../constants";
import { Sight } from "../interfaces/common";
import { fakeResp } from "../utils/mocks";
import { newSightState } from "./interfaces";


const initialState: newSightState = {
  showSightModal: false,
  error: false,
  newSight: null,
  modalStatus: SIGHT_MODAL_STATUS.NEW,
};

export const createSight = createAsyncThunk<{ newSight: Sight }, { newSight: Sight }>(
  "createSight",
  async (newSight: any) => {
    console.log(newSight);
    const response = await fakeResp(true, 1000);
    if (response.success) {
      return {
        newSight: response.body ?? [],
      };
    } else {
      throw "Error creating sight";
    }
  }
);

const newSightSlice = createSlice({
  name: "newSightSlice",
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
        state.newSight = action.payload.newSight;
        state.modalStatus = SIGHT_MODAL_STATUS.SUCCESS;
      })
      .addCase(createSight.rejected, (state) => {
        state.error = true;
        state.modalStatus = SIGHT_MODAL_STATUS.FAILED;
      });
  },
});

export const { openModal, closeModal } = newSightSlice.actions;
export default newSightSlice.reducer;