export const HTTP_STATUS_CODES = {
    UNPROCESSABLE_ENTITY: 422,
    CONFLICT: 409,
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
};
export const HOME_URL = '/';

export const REGISTER_URL = '/api/auth/register';
export const SIGN_IN_URL = '/sign-in';

export const SIGN_UP_URL = '/sign-up';

export const DATABASE_CONNECTION_ERROR = "Unable to connect to database";
export const DATABASE_DISCONNECTION_ERROR = "Unable to disconnect from database";
export const PASSWORD_HASH_ERROR = "Unable to generate hash of password";
export const PASSWORD_COMPARE_ERROR = "Unable to compare the passwords";
export const USER_CREATION_ERROR = "Unable to add user to database";
export const USER_FETCH_ERROR = "Unable to find users in the database";
export const USER_EMAIL_FETCH_ERROR = "Unable to find user with that email";
export const IMAGE_UPLOAD_ERROR = "Unable to upload data to database";
export const IMAGE_FETCH_ERROR = "Unable to fetch images from database";
export const IMAGE_DELETE_ERROR = "Unable to delete image from database";