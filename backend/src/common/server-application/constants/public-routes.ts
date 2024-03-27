import { ApiPath,AuthApiPath } from 'shared/build/index.js';

const API_PREFIX = '/api/v1';

const publicRoutes = new Map([
    [AuthApiPath.SIGN_IN, `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`],
    [AuthApiPath.SIGN_UP, `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`]
]);

export { publicRoutes };