export const mapbox_token = 'pk.eyJ1IjoibWF1cm9zb3BwZWxzYSIsImEiOiJjbDU4NWh3c2cxdTNzM29xeDlrc243d3Z3In0.HiJKZTcG3rXLL8eeJyK-xQ';
export const mapbox_base_path = 'https://api.mapbox.com';
export const map_size = {
    width: 800,
    height: 600,
};
export const mapbox_style = 'outdoors-v11';
export const mapbox_marker = 'pin-s-l+000';
export const map_image_zoom = '11';
export const map_zoom_level = 8;

const mapliter_key = 'YJZYI4SXhXxTI50OhBym';
export const mapliter_url = `https://api.maptiler.com/maps/outdoor/style.json?key=${mapliter_key}`;

export const map_style = {
    version: 8,
    name: 'Land',
    sources: {
        map: {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            minzoom: 1,
            maxzoom: 19,
        },
    },
    layers: [
        {
            id: 'background',
            type: 'background',
            paint: {
                'background-color': '#f2efea',
            },
        },
        {
            id: 'map',
            type: 'raster',
            source: 'map',
            paint: {
                'raster-fade-duration': 100,
            },
        },
    ],
};