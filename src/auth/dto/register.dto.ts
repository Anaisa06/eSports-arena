import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/common/enums/roles.enum";

export class RegisterUserDto {
    @ApiProperty({ name: 'name', example: 'Lulú'})
    @IsString()
    name: string;

    @ApiProperty({ name: 'email', example: 'lulu@gmail.com'})
    @IsEmail()
    email: string;

    @ApiProperty({ name: 'password', example: 'MyPassword.123'})
    @IsStrongPassword()
    password: string;

    @ApiPropertyOptional({ name: 'role', example: Role.ADMIN})
    @IsEnum(Role)
    @IsOptional()
    role?: Role;
    
}
