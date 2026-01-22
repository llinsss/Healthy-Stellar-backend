import { IsString, IsOptional, IsUUID } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class LogoutDto {
  @IsOptional()
  @IsUUID()
  sessionId?: string;
}

export class SessionDto {
  @IsOptional()
  @IsString()
  deviceId?: string;

  @IsOptional()
  @IsString()
  deviceName?: string;
}
