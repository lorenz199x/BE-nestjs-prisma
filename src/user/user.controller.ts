import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
			const user = await this.userService.register(registerUserDto);
			return {
					status: 'Ok!',
					message: 'User successfully registered!',
					data: user,
			};
    }
}
