import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { User } from '../user/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<User | null> {
        try {
            const user = await this.userService.findByUsername(username);
            if (!user) {
                console.log(`username  not found.`);
                return null;
            }
            console.log(`Usersuccessfully validated`);
            return user;
        } catch (error) {
            console.error('Error occurred while validating user:', error);
            throw new UnauthorizedException('Error occurred while validating user');
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
        const { username, password } = loginUserDto;
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}
