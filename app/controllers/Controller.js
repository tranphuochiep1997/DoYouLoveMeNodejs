
class Controller {
  constructor() {

  }
  successResponse(res, options) {
    let { error, status, data, message } = options;
    error = error || false;
    status = status || 200;
    message = message || 'success';
    data = data || null;
    return res.json({
      error,
      data,
      message,
      status
    });
  }


  createdResponse(res, options) {
    let { error, status, data, message } = options;
    error = error || false;
    status = status || 201;
    message = message || 'success';
    data = data || null;
    return res.status(status).json({
      error,
      data,
      message,
      status
    });
  }

  errorResponse(res, options) {
    let { error, status, data, message } = options;
    error = error || true;
    status = status || 400;
    message = message || 'Error';
    data = data || null;
    return res.json({
      error,
      data,
      message,
      status
    });
  }

  inValidResponse(res, options) {
    let { error, status, data, message } = options;
    error = error || true;
    status = status || 400;
    message = message || 'Invalid';
    data = data || null;
    return res.json({
      error,
      data,
      message,
      status
    });
  }
}

module.exports = Controller;