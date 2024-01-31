const successResponse = (res, data, msg = "Success response") => {
  res.status(200).json({
    data: data,
    message: msg,
    status: 200,
  });
};

const successfullyCreatedResponse = (
  res,
  data,
  msg = "Record created successfully."
) => {
  res.status(201).json({
    data: data,
    message: msg,
    status: 201,
  });
};

const badRequestResponse = (res, error, msg = "Validation error") => {
  res.status(400).json({
    error: error,
    message: msg,
    status: 400,
  });
};

const unauthorizedResponse = (res, msg = "Unauthorized") => {
  res.status(401).json({ message: msg, status: 401 });
};

const notFoundResponse = (res, msg = "Route Not Found") => {
  res.status(404).json({ message: msg, status: 404 });
};

const recordAlreadyExistResponse = (res, msg = "Record Already Exist") => {
  res.status(409).json({ message: msg, status: 409 });
};

const serverErrorResponse = (res, msg = "Server Error") => {
  res.status(500).json({ message: msg, status: 500 });
};

module.exports = {
  successResponse,
  successfullyCreatedResponse,
  badRequestResponse,
  notFoundResponse,
  serverErrorResponse,
  recordAlreadyExistResponse,
  unauthorizedResponse,
};
