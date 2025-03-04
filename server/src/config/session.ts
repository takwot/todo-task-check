import { SessionOptions } from 'iron-session';

export interface UserSession {
  user?: { id: string; email: string };
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'session',
  cookieOptions: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
  },
};
