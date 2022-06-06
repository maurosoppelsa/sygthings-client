import { createSlice } from "@reduxjs/toolkit";

const cameraSlice = createSlice({
    name: "authSlice",
    initialState: {cameraActive: false},
    reducers: {
        toggleCamera: (state: any, action: any) => {
            state.cameraActive = action.payload.cameraActive;
        },
    },
  });

  export const {toggleCamera} = cameraSlice.actions;
  export default cameraSlice.reducer;