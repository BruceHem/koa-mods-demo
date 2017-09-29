import { createHash } from 'crypto';
import { sign } from 'jsonwebtoken';
import { Body, Controller, Post } from 'koa-mods';

import { BadRequestError } from '../../common';
import { default as User, UserAttributesOpt } from '../../models/user.model';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  @Post('/register')
  async register(@Body() { username, password }: RegisterDto) {
    const user = await User.create<User, UserAttributesOpt>({
      username,
      password
    });
    return user;
  }

  @Post('/login')
  async login(@Body() { username, password }: LoginDto) {
    const user = await User.findByUsername(username);
    if (!user) throw new BadRequestError('The username and password entered did not match our records.');

    const passwordHash = createHash('SHA512').update(password).digest('base64');
    if (passwordHash !== user.password) {
      throw new BadRequestError('The password entered is incorrect.');
    }

    const accessToken = sign({ id: user.id, username }, process.env.SECRET!);
    return { accessToken };
  }
}
