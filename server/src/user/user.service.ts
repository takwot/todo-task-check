import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { getIronSession } from 'iron-session';
import { sessionOptions, UserSession } from 'src/config/session';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      console.log(user);

      return {
        status: true,
      };
    } catch {
      throw new BadRequestException('Error');
    }
  }

  async login(email: string, password: string, res: Response, req: Request) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    const session = await getIronSession<UserSession>(req, res, sessionOptions);

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('invalid credential');

    session.user = {
      id: user.id,
      email: user.email,
    };

    await session.save();

    console.log(session);

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    return res
      .send({
        status: true,
        user: session.user,
      })
      .status(200);
  }

  async logout(res: Response, req: Request) {
    const session = await getIronSession<UserSession>(req, res, sessionOptions);

    session.destroy();

    return res
      .send({
        status: true,
      })
      .status(200);
  }

  async me(req: Request, res: Response) {
    const session = await getIronSession<UserSession>(req, res, sessionOptions);

    console.log('request', session);

    if (!session.user) {
      return res
        .send({
          status: false,
        })
        .status(200);
    }

    return res
      .send({
        status: true,
        email: session.user?.email,
      })
      .status(200);
  }
}
