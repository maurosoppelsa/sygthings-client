import { LocationDetails } from '../interfaces/common';

export const locationHandler = (locationDetails: any) => {
    let locationFormat: LocationDetails = {
        locality: '',
        neighborhood: '',
        place: '',
        region: '',
        country: '',
    }
    if (!locationDetails) {
        return;
    }
    locationDetails.map((location: any) => {
        Object.keys(locationFormat).map((key) => {
            if (location.id.startsWith(key)) {
                locationFormat[key as keyof LocationDetails] = location.text;
            }
        });
    })
    return locationFormat;
};

export const locationToLegend = (locationDetail: LocationDetails) => {
    let legend = '';
    let index = 0;
    Object.keys(locationDetail).forEach((item) => {
        index++;
        if (locationDetail[item as keyof LocationDetails]) {
            legend += `${locationDetail[item as keyof LocationDetails]}${index !== Object.keys(locationDetail).length ? ', ' : ''}`;
        }
    });
    return legend;
};