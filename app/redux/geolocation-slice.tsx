import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Location } from "../interfaces/common";
import GeoLocationService from "../services/geolocation.service";

const initialState = {
  mapImageUrl: '',
  error: false,
  loading: false,
  location: {},
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

export const getLocationInfo = createAsyncThunk<{ locationInfo: {country: string, region: string, place: string} }>(
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

export const setCurrentLocation = createAsyncThunk(
  "setCurrentLocation",
  (location: Location) => {
    geoService.setLocation(location);
    return {
      location,
    };
  }
);

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
      .addCase(setCurrentLocation.fulfilled, (state, action) => {
        state.location = action.payload.location;
      })
      .addCase(getLocationInfo.fulfilled, (state, action) => {
        state.locationInfo = action.payload.locationInfo;
        state.loading = false;
      })
      .addCase(getLocationInfo.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default geolocationSlice.reducer;
export const {toggleLocationModal} = geolocationSlice.actions;