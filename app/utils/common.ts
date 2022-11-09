export const hasEmptyProperties = (obj: any) => Object.values(obj).every(x => (x === null || x === ''));

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