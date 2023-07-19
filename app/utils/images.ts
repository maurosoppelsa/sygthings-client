import { IMAGES_BASE_PATH } from '../config/authentication';

// This is a rustic way to bust the cache of the images to avoid an issue with the cache of the images in react-native
const bustCache = () => {
    return `?bustCache=${new Date().getTime()}`;
}

export const getSightImageUri = (imageId: string | undefined) => {
    return imageId ? `${IMAGES_BASE_PATH}/${imageId}${bustCache()}` : '';
}
