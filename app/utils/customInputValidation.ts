import moment from 'moment';

export const spanishErrorMessages = {
    es: {
        email: 'El email no es válido',
        minlength: 'El campo debe ser mayor a {1} caracteres',
        maxlength: 'El campo debe ser menor a {1} caracteres',
        required: 'campo requerido',
        equalPassword: 'Las contraseñas no coinciden',
        passwordsNotEmpty: 'si desea cambiar la contraseña debe llenar todos los campos',
    },
};

// Custom default rules to validate form fields
export const customRules = {
    numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
    required: /\S+/,
    hasNumber: /\d/,
    hasUpperCase: /(?=.*[A-Z])/,
    hasLowerCase: /(?=.*[a-z])/,
    hasSpecialCharacter: /(\W)/,
    date(format = 'YYYY-MM-DD', value: moment.MomentInput) {
        const d = moment(value, format);
        if (d == null || !d.isValid()) return false;
        return true;
    },
    minlength(length: number | undefined, value: string | any[]) {
        if (length === void 0) {
            throw 'ERROR: It is not a valid length, checkout your minlength settings.';
        } else if (value.length >= length || value.length === 0) {
            return true;
        }
        return false;
    },
    maxlength(length: number | undefined, value: string | any[]) {
        if (length === void 0) {
            throw 'ERROR: It is not a valid length, checkout your maxlength settings.';
        } else if (value.length > length) {
            return false;
        }
        return true;
    },
    equalPassword(dataToCompare: any, value: any) {
        return dataToCompare === value || value.length === 0;
    },
    email(length: number | undefined, value: string | any[]) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (length === void 0) {
            throw 'ERROR: It is not a valid length, checkout your email settings.';
        } else if (typeof value === 'string' && regex.test(value) || value.length === 0) {
            return true;
        }
        return false;
    },
    passwordsNotEmpty(fields: any) {
        const { password, newPassword, confirmNewPassword } = fields;
        
        // Check if all fields are empty
        if (!password && !newPassword && !confirmNewPassword ) {
          return true;
        }
        
        // Check if some of the fields are non-empty
        if (password || newPassword || confirmNewPassword) {
          if (!password || !newPassword || !confirmNewPassword) {
            return false;
          }
        }
        
        return true;
      }
}
