import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly configService: ConfigService, private readonly userService: UserService, private readonly authService: AuthService) {
    super({
      clientID: configService.get('FORTYTWO_CLIENT_ID'),
      clientSecret: configService.get('FORTYTWO_CLIENT_SECRET'),
      callbackURL: configService.get('CALL_BACK_URL_42'),
      passReqToCallback: true,
    });
  }

  extract42UserData(profile: any) {

    const { login, email, image } = profile._json;
    const userData: CreateUserDto = {
      email: email,
      username: login,
      avatar:profile._json.image.link,
      cover: '',
      password: '',
    };
    return userData;
  }
  async validate(
    request: { session: { accessToken: string } },
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function,
  ) {
    const user = this.extract42UserData(profile);
    let userCheck = await this.userService.findUserEmail(user.email);
    console.log(userCheck);
    
    if (!userCheck)
      {
        const newUser = await this.authService.signup(user);
        userCheck  = await this.userService.findUserById(newUser.id);
      }
    return done(null, userCheck);
  }
}