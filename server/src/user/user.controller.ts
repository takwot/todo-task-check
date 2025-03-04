import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    console.log(body);
    return this.userService.register(body.email, body.password);
  }

  @Post('login')
  login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.userService.login(body.email, body.password, res, req);
  }

  @Post('logout')
  logout(@Res() res: Response, @Req() req: Request) {
    return this.userService.logout(res, req);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request, @Res() res: Response) {
    return this.userService.me(req, res);
  }
}
