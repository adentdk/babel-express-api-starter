import sendJsonResponse from '@utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import db from '@models';

export const getRoomList = async (req, res, next) => {
  const { username } = req.auth;

  try {
    const user = await db.User.findByUsername(username);

    if (!user) {
      next({
        status: StatusCodes.BAD_REQUEST,
        message: 'user not found',
      });
    }

    const rooms = await user.getChatRooms();

    sendJsonResponse(res, {
      status: StatusCodes.OK,
      data: {
        user: user.toJSON(),
        rooms: rooms.map((room) => room.toJSON()),
      },
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
