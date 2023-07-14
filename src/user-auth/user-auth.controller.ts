import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { User } from './schemas/user-auth.schema';
import { AuthGuard } from './auth.guard';

@Controller('api/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('register')
  async registerUser(@Body() body: { username: string; password: string }): Promise<{ message: string }> {
    const { username, password } = body;
    await this.userAuthService.registerUser(username, password);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async loginUser(@Body() body: { username: string; password: string }): Promise<{ message: string; token: string }> {
    const { username, password } = body;
    const token = await this.userAuthService.loginUser(username, password);
    return { message: 'Login successful', token };
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async getUsers(): Promise<User[]> {
    return this.userAuthService.getUsers();
  }
}
