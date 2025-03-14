import { HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { ResponseDto } from 'common/dtos';
import { CreateUserDto, SigninDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private config: ConfigService, private jwt: JwtService){}

    async register(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.userModel.findOne({ email: createUserDto.email });
        if (user) return new ResponseDto(false, {}, {email: 'User already exist'}, 'User already exist', HttpStatus.BAD_REQUEST);

        const hashedPassword = await argon2.hash(createUserDto.password);
        
        try {
            const user = await this.userModel.create({
                ...createUserDto,
                password: hashedPassword,
            });
            const getToken = await this.signToken(user._id, user.email, user.role);
            return  new ResponseDto(true, getToken, {}, 'Successfully resgisted', HttpStatus.OK);
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong, please try again later');
        }
    }
    
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ email });
        if (user && await argon2.verify(user.password, password)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }
    
    async signin(signinDto: SigninDto) {
        const user = await this.validateUser(signinDto.email, signinDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const getToken = await this.signToken(user._id, user.email, user.role);
        return  new ResponseDto(true, getToken, {}, 'Successfully Signin', HttpStatus.OK);
    }

    async signToken(userId: string, email: string, role: string): Promise<{ accessToken: string }> {
        const payload = { sub: userId, email, role };
        const secret = this.config.get<string>('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
          secret,
          expiresIn: '1h',
        });
      
        return { accessToken: token };
    }
    
}
