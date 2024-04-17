import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    @IsIn(['Admin', 'Auditor'])
    userRole: string
}
