import sendJsonResponse from '@utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import db from '@models';
import * as yup from 'yup';
import { Op } from 'sequelize';

export const createRoomSchema = yup.object().shape({
  body: yup.object().shape({
    description: yup.string().max(255).trim().optional(),
    participantUsername: yup.string().max(32).required(),
  }).noUnknown(),
});

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

export const createRoom = async (req, res, next) => {
  const {
    auth: {
      username,
    },
    body: {
      description,
      participantUsername,
    },
  } = req;

  let t = null;

  try {
    t = await db.sequelize.transaction();

    const users = await db.User.findAll({
      where: {
        username: {
          [Op.in]: [username, participantUsername],
        },
      },
    });

    if (users.length !== 2) {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: 'participant not found',
      };
    }

    const room = await db.ChatRoom.create({ description }, { transaction: t });

    await room.addParticipants(users, { transaction: t });

    await t.commit();

    sendJsonResponse(res, {
      status: StatusCodes.OK,
    });
  } catch (error) {
    next({
      ...error,
      t,
    });
  }
};

export const getRoomMessages = (req, res, next) => {
  // eslint-disable-next-line no-empty
  try { } catch (error) {
    next(error);
  }
};
