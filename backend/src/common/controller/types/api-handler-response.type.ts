import  { type ServerErrorType } from 'shared/build';

import { type HttpCode } from '~/common/http/http.js';
import { type ValueOf } from '~/common/types/types.js';

type ApiHandlerResponseStatus = ValueOf<typeof HttpCode>;

type ApiHandlerResponse<T> = {
    status: ApiHandlerResponseStatus;
    refreshToken?: string;
    accessToken?: string;
    contentType?: string;
    payload:
        | {
              message?: string;
              status?: ApiHandlerResponseStatus;
              errorType?: ServerErrorType;
          }
        | T;
};

export { type ApiHandlerResponse };
