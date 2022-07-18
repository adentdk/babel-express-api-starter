import sendJsonResponse from '@utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import db from '@models';

import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  body: yup.object().shape({
    username: yup.string().max(32).trim().required(),
    password: yup.string().min(8).trim().required(),
  }).noUnknown(),
});

export const registerSchema = yup.object().shape({
  body: yup.object().shape({
    fullName: yup.string().max(64).trim().required(),
  }).noUnknown(),
}).concat(loginSchema);

export const login = async (req, res, next) => {
  const {
    body: {
      username,
      password,
    },
  } = req;

  try {
    const user = await db.User.findByUsername(username);

    if (!user) {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: 'username or password is incorrect',
      };
    }

    const isPasswordCorrect = user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: 'username or password is incorrect',
      };
    }

    sendJsonResponse(res, {
      status: StatusCodes.OK,
      data: user.createTokens(),
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  const {
    body: newUserData,
  } = req;

  try {
    await db.User.create(newUserData);

    sendJsonResponse(res, {
      status: StatusCodes.CREATED,
      message: 'Register success',
    });
  } catch (error) {
    if (error.name) {
      next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Username is already taken',
      });
    } else {
      next(error);
    }
  }
};
