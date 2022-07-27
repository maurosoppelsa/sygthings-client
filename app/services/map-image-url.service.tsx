import { mapbox_token, mapbox_base_path, map_size, mapbox_style, mapbox_marker, map_zoom } from "../config/map-settings";

export default class MapImageUrlService {
    mapUrl: URL;
    mapboxToken: string;
    mapboxBasePath: string;
    latitude: string;
    longitude: string;
    marker: string;
    style: string;
    zoom: string;
    size: {
        width: number,
        height: number,
    };

    constructor(location: any) {
        this.mapboxToken = mapbox_token;
        this.mapboxBasePath = mapbox_base_path;
        this.latitude = location.latitude;
        this.longitude = location.longitude;
        this.marker = mapbox_marker;
        this.size = map_size;
        this.style = mapbox_style;
        this.zoom = map_zoom;
        this.mapUrl = this.urlRequestGenerator(this.latitude, this.longitude);
    }
    public getMapImageUrl() {
        return fetch(this.mapUrl)
            .then((response) => response.url)
            .catch((error) => console.error(error))
    }
    private urlRequestGenerator(latitude: string, longitude: string) {
        return new URL(`styles/v1/mapbox/${this.style}/static/${this.marker}(${longitude},${latitude})/${longitude},${latitude},${this.zoom}/${this.size.width}x${this.size.height}?access_token=${this.mapboxToken}`, this.mapboxBasePath);
    }
} 