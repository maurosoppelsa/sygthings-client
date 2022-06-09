import { createSlice } from "@reduxjs/toolkit";

const cameraSlice = createSlice({
    name: "authSlice",
    initialState: {cameraActive: false, picture: null},
    reducers: {
        toggleCamera: (state: any, action: any) => {
            state.cameraActive = action.payload.cameraActive;
            state.picture = null;
        },
        newPicture: (state: any, action: any) => {
            state.picture = action.payload;
            state.cameraActive = false;
        }
    },
  });

  export const {toggleCamera, newPicture} = cameraSlice.actions;
  export default cameraSlice.reducer;