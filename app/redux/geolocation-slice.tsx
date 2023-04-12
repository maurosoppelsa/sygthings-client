import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Coordinates } from "../interfaces/common";
import GeoLocationService from "../services/geolocation.service";

const initialState = {
  mapImageUrl: '',
  error: false,
  loading: false,
  coordinates: {},
  locationInfo: {},
  showLocationModal: false,
};

const geoService: GeoLocationService = GeoLocationService.getInstance();

export const getMapUrl = createAsyncThunk<{ mapUrl: any }>(
  "getMapUrl",
  async () => {
    const response = await geoService.getMapImageUrl();
    if (response) {
      return {
        mapUrl: response ?? '',
      };
    } else {
      throw "Error receiving map image";
    }
  }
);

export const getLocationInfo = createAsyncThunk<{ locationInfo: { country: string, region: string, place: string } }>(
  "getLocationInfo",
  async () => {
    const response = await geoService.getLocationInfo();
    if (response) {
      return {
        locationInfo: response ?? {},
      };
    } else {
      throw "Error receiving location information";
    }
  }
);

export const setCurrentCoordinates = createAsyncThunk(
  "setCurrentLocation",
  (coordinates: Coordinates) => {
    geoService.setLocation(coordinates);
    return {
      coordinates,
    };
  }
);

export const resetGeoLocation = createAsyncThunk("resetGeoLocation", () => {
  return;
});

const geolocationSlice = createSlice({
  name: "mapSlice",
  initialState,
  reducers: {
    toggleLocationModal: (state: any) => {
      state.showLocationModal = !state.showLocationModal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMapUrl.pending, (state) => {
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
      })
      .addCase(getLocationInfo.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(setCurrentCoordinates.fulfilled, (state, action) => {
        state.coordinates = action.payload.coordinates;
      })
      .addCase(getLocationInfo.fulfilled, (state, action) => {
        state.locationInfo = action.payload.locationInfo;
        state.loading = false;
      })
      .addCase(getLocationInfo.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(resetGeoLocation.fulfilled, (state) => {
        state.mapImageUrl = '';
        state.error = false;
        state.loading = false;
        state.coordinates = {};
        state.locationInfo = {};
      });
  },
});

export default geolocationSlice.reducer;
export const { toggleLocationModal } = geolocationSlice.actions;