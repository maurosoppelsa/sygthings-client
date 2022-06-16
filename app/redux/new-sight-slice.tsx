import { createSlice } from "@reduxjs/toolkit";

const newSightSlice = createSlice({
    name: "newSightSlice",
    initialState: { showSightModal: false },
    reducers: {
        toggleSightModal: (state: any) => {
            state.showSightModal = !state.showSightModal;
        },
    },
});

export const { toggleSightModal } = newSightSlice.actions;
export default newSightSlice.reducer;