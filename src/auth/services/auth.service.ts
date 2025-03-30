import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';
import { SigneUpDto } from '../dtos/signup.dto';
import { UpdateUserDto } from '../dtos/update.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup({
    password,
    name,
    email,
    role = 'user',
    image = '',
  }: SigneUpDto) {
    try {
      // Check if email is already registered
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }

      // Hash the password securely
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create the user
      const newUser = new this.userModel({
        name,
        email,
        role,
        image,
        password: hashedPassword,
      });
      await newUser.save();

      // Create JWT Token
      const payload = { name, email, role, _id: newUser._id, image };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Signup successful', // ✅ Fixed typo
        user: payload,
        token,
      };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        throw new UnauthorizedException('Invalid credentials');

      const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        image: user.image,
      };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Login successful',
        // ✅ Fixed success flag
        user: payload,
        token,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async updateProfile(id: string, data: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updatedUser) {
        return { message: 'User not found', success: false };
      }

      return {
        message: 'Profile updated successfully',

        user: updatedUser,
      };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async deleteProfile(id: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);

      if (!deletedUser) {
        return { message: 'User not found', success: false };
      }
      return {
        message: 'Profile deleted successfully',
        user: deletedUser,
      };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
  async getUser(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return {
        message: 'User found',
        user: {
          _id: user._id,
          name: user.name,
          role: user.role,
          image: user.image,
        },
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
