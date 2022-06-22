import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Sight } from "../interfaces/common";
import { fakeResp } from "../utils/mocks";
import { newSightState } from "./interfaces";


const initialState: newSightState = {
    showSightModal: false,
    loading: false,
    error: false,
    newSight: null,
};

export const createSight = createAsyncThunk<{ newSight: Sight }, { newSight: Sight }>(
    "createSight",
    async () => {
      const response = await fakeResp(true, 1000);
      if (response.success) {
        return {
          newSight: response.body ?? [],
        };
      } else {
        throw "Error login user";
      }
    }
  );

const newSightSlice = createSlice({
    name: "newSightSlice",
    initialState,
    reducers: {
        toggleSightModal: (state: any) => {
            state.showSightModal = !state.showSightModal;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(createSight.pending, (state) => {
            state.loading = true;
            state.error = false;
          })
          .addCase(createSight.fulfilled, (state, action) => {
            state.newSight = action.payload.newSight;
            state.loading = false;
          })
          .addCase(createSight.rejected, (state) => {
            state.error = true;
            state.loading = false;
          });
      },
});

export const { toggleSightModal } = newSightSlice.actions;
export default newSightSlice.reducer;