import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
    email: joi
        .string()
        .trim()
        .email({
            tlds: {
                allow: false,
            },
        })
        .required()
        .messages({
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
        }),
    password: joi.string().trim().min(6).required().messages({
        'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
        'string.min': UserValidationMessage.PASSWORD_SHORT
    }),
    firstName: joi.string().trim().min(3).max(20).required().messages({
        'string.empty': UserValidationMessage.FIRSTNAME_REQUIRE,
        'string.min': UserValidationMessage.FIRSTNAME_SHORT,
        'string.max': UserValidationMessage.FIRSTNAME_LONG
    }),
    lastName: joi.string().trim().min(3).max(20).required().messages({
        'string.empty':UserValidationMessage.LASTNAME_REQUIRE,
        'string.min': UserValidationMessage.LASTNAME_SHORT,
        'string.max': UserValidationMessage.LASTNAME_LONG
    }),
});

export { userSignUp };