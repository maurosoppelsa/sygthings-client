import moment from 'moment';
import I18n from '../../i18n/i18n';
import { defaultLanguage } from '../config/language';
import 'moment/locale/es';
import { Platform, Dimensions } from 'react-native';

moment.locale(defaultLanguage);

export const hasEmptyProperties = (obj: any) => Object.values(obj).every(x => (x === null || x === ''));

export const hasZeroCoordinates = (coordinates: any) => coordinates.latitude === "0" && coordinates.longitude === "0";

export const getInitials = function (fullname: string) {
    var names = fullname.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

export const capitalizeText = function (text: string = '') {
    if (!text) {
        return;
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export const getFormattedDate = function (date: string) {
    return moment(date).format('DD/MM/YYYY:HH:mm');
}

export const getDateFromNow = function (date: string) {
    return moment(date).fromNow();
}

export const getCreatedByLegend = function (firstName: string = '', lastName: string = '', occupation: string = '', createdAt: string = '') {
    if (!createdAt) return;
    if (!firstName || !lastName) return `${I18n.t('Sight.createdAt')} ${getDateFromNow(createdAt)}`;
    return (
        `${I18n.t('Sight.createdBy')} ` +
        `${capitalizeText(firstName)} ${capitalizeText(lastName)} ` +
        `${occupation ? ', ' + capitalizeText(occupation) + ', ' : ''} ` +
        `${getDateFromNow(createdAt)}`
    );
}

export const hasDateExpired = function (expiresIn: number) {
    const now = moment().unix();
    return now > expiresIn;
}

export const getTomorrowDate = function () {
    return moment().add(1, 'days').unix();
}

export const isTabletDevice = function () {
    const { height, width } = Dimensions.get('window'); // Get screen dimensions
    return (Platform.OS === 'android' && (height > 960 || width > 960));
};