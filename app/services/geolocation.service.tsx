import { mapbox_token, mapbox_base_path, map_size, mapbox_style, mapbox_marker, map_zoom } from "../config/map-settings";
import { Location } from '../interfaces/common';
import { locationHandler } from "../utils/geolocation-helper";

export default class GeolocationService {
    private static _instance: GeolocationService = new GeolocationService();

    mapUrl: URL | undefined;
    mapboxToken: string;
    mapboxBasePath: string;
    location: Location | null;
    marker: string;
    style: string;
    zoom: string;
    size: {
        width: number,
        height: number,
    };

    constructor() {
        if (GeolocationService._instance) {
            throw new Error("Error: Instantiation failed: Use GeolocationService.getInstance() instead of new.");
        }
        GeolocationService._instance = this;
        this.mapboxToken = mapbox_token;
        this.mapboxBasePath = mapbox_base_path;
        this.location = null;
        this.marker = mapbox_marker;
        this.size = map_size;
        this.style = mapbox_style;
        this.zoom = map_zoom;
    }

    public setLocation(location: Location) {
        this.location = location;
        this.mapUrl = this.urlRequestGenerator();
    }

    public static getInstance(): GeolocationService {
        return GeolocationService._instance;
    }

    private urlRequestGenerator() {
        if (!this.location) {
            return;
        }
        return new URL(`styles/v1/mapbox/${this.style}/static/${this.marker}(${this.location.longitude},${this.location.latitude})/${this.location.longitude},${this.location.latitude},${this.zoom}/${this.size.width}x${this.size.height}?access_token=${this.mapboxToken}`, this.mapboxBasePath);
    }

    public getLocationInfo() {
        if (!this.location) {
            return;
        }
        return fetch(`${this.mapboxBasePath}/geocoding/v5/mapbox.places/${this.location.longitude},${this.location.latitude}.json?access_token=${this.mapboxToken}`)
            .then((response) => response.json())
            .then((json) => {
                return locationHandler(json?.features[0]?.context);
            })
            .catch((error) => console.error(error))
    }
    public getMapImageUrl() {
        if (!this.mapUrl) {
            return new Error('Location was not set, use method setLocation');
        }
        return fetch(this.mapUrl)
            .then((response) => response.url)
            .catch((error) => console.error(error))
    }
}