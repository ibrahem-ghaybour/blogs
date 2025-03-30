import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Patch,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/auth.guard';
import { SigneUpDto } from '../dtos/signup.dto';
import { UpdateUserDto } from '../dtos/update.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SigneUpDto) {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Body() body: { name: string; image: string },
    @Param('id') id: string,
    @Request() req,
  ) {
    const userIDFromToken = req.user._id;
    if (userIDFromToken !== id) {
      throw new ForbiddenException('You can only update your own account');
    }
    return this.authService.updateProfile(id, body);
  }
  // ✅ حماية هذا الرابط باستخدام JWT
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // created_at updated_at
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      created_at: new Date(req.user.iat * 1000).toISOString(),
      updated_at: new Date(req.user.exp * 1000).toISOString(),
    };
    return { ...user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.authService.getUser(id);
  }
}
