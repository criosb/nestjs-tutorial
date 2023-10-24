import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() { username, password }: AuthDTO) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const jwt = await this.authService.generateToken(user);
    return jwt;
  }
}
