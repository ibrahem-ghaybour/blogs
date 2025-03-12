import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(
    name: string,
    email: string,
    password: string,
    admin: boolean = false,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      email,
      admin,
      password: hashedPassword,
    });
    await newUser.save();

    const req = { name, email, admin, _id: newUser._id };
    const token = this.jwtService.sign(req);
    return { ...req, token };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { userId: user._id, email: user.email, admin: user.admin };
    const token = this.jwtService.sign(payload);

    return { message: 'Login successful', token };
  }
}
