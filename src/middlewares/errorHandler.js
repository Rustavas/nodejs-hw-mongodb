// import { isHttpError } from "http-errors";

// export const errorHandler = (error, req, res, next) => {

//   if (isHttpError(error)) {
//     return res.status(error.status).json({
//       status: error.status,
//       message: error.message,
//       data: error,
//     });
//   }

//   res.status(500).json({
//     status: 500,
//     message: "Something went wrong",
//     data:  error.message,
//   });

// };

import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};