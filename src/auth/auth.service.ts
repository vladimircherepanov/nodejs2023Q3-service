import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../resources/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private readonly secretKey: string = process.env.JWT_SECRET;
  private readonly expires: string = process.env.JWT_EXPIRES;
  private readonly refreshExpires: string = process.env.JWT_REFRESH_EXPIRES;

  async signUp(signUpDto) {
    const login = signUpDto.login;
    const user = await this.usersService.getByLogin(login);
    if (!user) {
      const createdUser = await this.usersService.create(signUpDto);
      const payload = { userId: createdUser.id, login: createdUser.login };
      return {
        accessToken: await this.jwtService.signAsync(payload, {
          secret: this.secretKey,
          expiresIn: this.expires,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          secret: this.secretKey,
          expiresIn: this.refreshExpires,
        }),
      };
    } else return false;
  }

  async login(loginDto) {
    const login = loginDto.login;
    const password = loginDto.password;
    const user = await this.usersService.getByLogin(login);
    if (user) {
      const passwordCheck = await user.user.checkPassword(password);
      if (passwordCheck) {
        const payload = { userId: user.user.id, login: user.user.login };

        return {
          accessToken: await this.jwtService.signAsync(payload, {
            secret: this.secretKey,
            expiresIn: this.expires,
          }),
          refreshToken: await this.jwtService.signAsync(payload, {
            secret: this.secretKey,
            expiresIn: this.refreshExpires,
          }),
        };
      } else return false;
    } else return false;
  }

  async refresh(refreshUserDto): Promise<{ access_token }> {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshUserDto.refreshToken,
        {
          secret: this.secretKey,
        },
      );
      delete payload.iat;
      delete payload.exp;

      console.log(payload);
      const newAccessToken = await this.jwtService.signAsync(payload, {
        secret: this.secretKey,
        expiresIn: this.expires,
      });

      return { access_token: newAccessToken };
    } catch (error) {
      console.error('Error during token refresh:', error);
      throw new Error('Invalid refresh token');
    }
  }
}
