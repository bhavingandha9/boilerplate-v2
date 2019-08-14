/**
 * This file is for all the response Messages and status so we can change it easily at any time.
 * @method messages contains all the messages[req.userLanguage].
 * @method status is for response status.
 * @method jsonStatus is for internal json status. we can change response status to 200 only for all response because browsers logs the 4** errors to console
 */

const messages = {
  English: {
    error: 'Something went wrong.',
    success: 'Sucessful',
    public_email_not_allowed: 'Public Emails are not allowed.',
    user_verified_succ: 'User verified successfully.',
    mail_fail_user_succ: 'Something went wrong, please try again.',
    user_save_succ: 'User data stored successfully.',
    wrong_password: 'Password is wrong.',
    auth_failed: 'Username or Password is incorrect.',
    succ_login: 'Login successful.',
    user_not_verified: 'User is not verified with email.',
    email_exist: 'Email already exist.',
    number_exist: 'Mobile number already exist.',
    email_number_exist: 'User already exist.',
    succ_logout: 'Logout successful.',
    err_unauthorized: 'User is unauthorized.',
    user_get_succ: 'User data get successfully.',
    user_remove_succ: 'User removed successfully.',
    user_update_succ: 'User updates successfully.',
    user_not_admin: 'User is not an admin.',
    user_list_get_succ: 'User list data get successfully.',
    token_not_valid: 'Token is not valid.',
    password_changed: 'Password changed successfully.',
    password_not_match: 'Password not matched.',
    wrong_old_password: 'Old password is wrong.',
    userAuthenticated: 'User is authenticated.',
    succ_mail_sent: 'Mail sent successfully.',
    image_upload_succ: 'Image uploaded successfully.',
    user_blocked: 'User is blocked.',
    route_not_found: 'Page Not Found.',
    token_verify: 'Token is verified.',
    not_token_verify: 'Link is not valid.',
    presigned_succ: 'Pre-signed url generated successfully.',
    req_start: 'Start is required.',
    req_state_numeric: 'Start should be a numeric value.',
    req_limit: 'Limit is required.',
    req_limit_numeric: 'Limit should be a numeric value.',
    required: '## is required',
    not_found: '## not found.',
    updated_succ: '## updated successfully'
  }
}

const status = {
  OK: 200,
  Create: 201,
  Deleted: 204,
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  Forbidden: 403,
  NotAcceptable: 406,
  ExpectationFailed: 417,
  Locked: 423,
  InternalServerError: 500
}

module.exports = {
  messages,
  status
}
