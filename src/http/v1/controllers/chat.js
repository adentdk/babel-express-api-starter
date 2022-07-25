import sendJsonResponse from '@utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import db from '@models';

export const getRoomList = async (req, res, next) => {
  const { id } = req.auth;

  try {
    const user = await db.User.findByPk(id);

    sendJsonResponse(res, {
      status: StatusCodes.OK,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const getRoomMessages = (req, res, next) => {
  // eslint-disable-next-line no-empty
  try {} catch (error) {
    next(error);
  }
};
