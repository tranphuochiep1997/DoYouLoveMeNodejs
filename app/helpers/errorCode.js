global.errorCode = {
  success: {
    error: 0,
    message: "success"
  },
  permission_denied: {
    error: 1,
    message: "permission_denied",
    data: null,
    status: 401
  },
  invalid_token: {
    error: 1,
    message: "invalid_token",
    data: null,
    status: 401
  },
  authorization_required: {
    error: 1,
    message: "authorization_required",
    data: null,
    status: 400
  },
  user_existed: {
    error: 1,
    message: "user_existed"
  },
  friend_established: {
    error: 1,
    message: "friend_request_established_before"
  },
  friend_itself: {
    error: 1,
    message: "make_friend_to_itself"
  },
  user_not_exist: {
    error: 1,
    message: "user_not_exist"
  },
  unauthorized: {
    error: 1,
    message: "unauthorized"
  },
  email_or_password_not_matched: {
    error: 1,
    message: "email_or_password_not_matched"
  },
  unexpected_error: {
    error: 1,
    message: "unexpected_error"
  },
  validation_error: {
    error: 1,
    message: "validation_error"
  },
  room_not_exist: {
    error: 1,
    message: "room_not_exist"
  }
}