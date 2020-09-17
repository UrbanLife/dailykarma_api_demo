import api from 'api';

export function checkAccess(data) {
    return api.auth.checkAccess(data);
}

export const utils = {
};