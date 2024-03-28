enum UserValidationMessage {
    FIRSTNAME_REQUIRE = 'First name is required',
    FIRSTNAME_SHORT = 'First name must be at least 3 characters long',
    FIRSTNAME_LONG = 'First name must be less than or equal to 20 characters long',
    LASTNAME_REQUIRE = 'Last name is required',
    LASTNAME_SHORT = 'Last name length must be at least 3 characters long',
    LASTNAME_LONG = 'Last name length must be less than or equal to 20 characters long',
    EMAIL_REQUIRE = 'Email is required',
    EMAIL_WRONG = 'Email is wrong',
    EMAIL_INVALID = 'Invalid email format. Please use a valid email address',
    PASSWORD_REQUIRED = 'Password is required',
    PASSWORD_INVALID = 'Invalid password format',
    PASSWORD_SHORT = 'Password should have at least 6 characters',
    CONFIRM_PASSWORD_REQUIRED = 'Confirm password required',
    CONFIRM_PASSWORD_MATCH = 'Confirm password should match the password',
}
export { UserValidationMessage };
