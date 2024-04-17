import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const { username, password, userRole } = registerUserDto;
        return this.prisma.user.create({
            data: {
                username,
                password,
                userRole,
            },
        });
    }

    async findByUsername(username: string): Promise<User | null> {
      return this.prisma.user.findFirst({
          where: {
              username: username,
          },
      });
  }
}
