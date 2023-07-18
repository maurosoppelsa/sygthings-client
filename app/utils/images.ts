import { IMAGES_BASE_PATH } from '../config/authentication';

export const getSightImageUri = (imageId: string | undefined) => {
    return imageId ? `${IMAGES_BASE_PATH}/${imageId}` : '';
}
