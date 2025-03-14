import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, SigninDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto ): Promise<any> {
        return await this.authService.register(createUserDto);
    }

    @Post('signin')
    async signin(@Body() signinDto: SigninDto ): Promise<any> {
        return await this.authService.signin(signinDto);
    }
}
