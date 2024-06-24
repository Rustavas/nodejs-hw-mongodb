import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Session } from '../db/models/session.js';

export const createUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new createHttpError(409, 'Email already exists');
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({
    ...payload,
    password: hashedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new createHttpError(404, 'User not found');
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new createHttpError(401, 'User not authorized');
  }

  await Session.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');

  const refreshToken = randomBytes(30).toString('base64');

  return await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 1000 * 15 * 60),
    refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });
};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
};



export const refreshSession = async ( sessionId, refreshToken ) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError('401', 'Session is not found!');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token is expired!');
  };

  const newSession = createSession();

  await Session.deleteOne({ _id: sessionId, refreshToken });

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};