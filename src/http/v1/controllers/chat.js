import sendJsonResponse from '@utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import db from '@models';
import * as yup from 'yup';
import { Op } from 'sequelize';

export const createRoomSchema = yup.object().shape({
  body: yup.object().shape({
    name: yup.string().max(255).trim().when('type', {
      is: (value) => value === 'group',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
    description: yup.string().max(255).trim().optional(),
    type: yup.string().oneOf(['personal', 'group']).default('personal').optional(),
    participantUsername: yup.string().max(32).when('type', {
      is: (value) => value === 'personal',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    participantUsernames: yup.string().max(32).when('type', {
      is: (value) => value === 'group',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
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

    const rooms = await user.getChatRooms({
      include: [
        {
          model: db.ChatMessage,
          as: 'messages',
          limit: 1,
          order: [
            ['createdAt', 'desc'],
          ],
        },
        {
          model: db.User,
          as: 'participants',
          through: {
            attributes: [],
            limit: 1,
            where: {
              userId: {
                [Op.ne]: user.id,
              },
            },
          },
        },
      ],
    });

    sendJsonResponse(res, {
      status: StatusCodes.OK,
      data: {
        rooms: rooms.map((room) => ({
          id: room.id,
          name: room.name || room.participants[0]?.fullName,
          lastMessage: room.messages[0]?.content,
          lastMessageAt: room.messages[0]?.createdAt,
        })),
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
      name,
      description,
      type,
      participantUsername,
      participantUsernames,
    },
  } = req;

  let t = null;

  try {
    t = await db.sequelize.transaction();

    const participants = [username];

    if (type === 'personal') {
      participants.push(participantUsername);
    } else {
      participants.concat(participantUsernames);
    }

    const users = await db.User.findAll({
      where: {
        username: {
          [Op.in]: participants,
        },
      },
    });

    if (users.length !== participants.length) {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: 'participant not found',
      };
    }

    const room = await db.ChatRoom.create({
      name,
      description,
      type,
    }, { transaction: t });

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

export const getRoomMessages = async (req, res, next) => {
  // eslint-disable-next-line no-empty
  const { roomId } = req.params;
  try {
    const room = await db.ChatRoom.findByPk(roomId);
    if (!room) {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: 'room not found',
      };
    }

    const messages = await room.getMessages({
      order: [
        ['createdAt', 'ASC'],
      ],
      limit: 50,
    });

    sendJsonResponse(res, {
      status: StatusCodes.OK,
      data: { messages },
    });
  } catch (error) {
    next(error);
  }
};
