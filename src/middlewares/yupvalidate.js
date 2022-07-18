import { StatusCodes } from 'http-status-codes';

const yupvalidate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, {
      abortEarly: false,
      strict: true,
    });
    next();
  } catch (error) {
    next({
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      name: error.name,
      message: error.message,
      data: error.inner,
    });
  }
};

export default yupvalidate;
