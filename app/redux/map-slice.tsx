import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MapImageUrlService from "../services/map-image-url.service";

const initialState = {
  mapImageUrl: "",
  error: false,
  loading: false,
};

export const getMapUrl = createAsyncThunk<{ mapUrl: any }, { latitude: string; longitude: string; }>(
  "getMapUrl",
  async (location: any) => {
    const mapService = new MapImageUrlService(location);
    const response = await mapService.getMapImageUrl();
    if (response) {
      return {
        mapUrl: response ?? '',
      };
    } else {
      throw "Error receiving map image";
    }
  }
);

const mapSlice = createSlice({
  name: "mapSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMapUrl.pending, (state) => {
        state.mapImageUrl = "";
        state.error = false;
        state.loading = true;
      })
      .addCase(getMapUrl.fulfilled, (state, action) => {
        state.mapImageUrl = action.payload.mapUrl;
        state.loading = false;
      })
      .addCase(getMapUrl.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default mapSlice.reducer;