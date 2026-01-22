import { IsString, IsOptional, Length } from 'class-validator';

export class MfaSetupDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  deviceName?: string;
}

export class MfaVerifyDto {
  @IsString()
  @Length(6, 6)
  code: string;
}

export class MfaEnableDto {
  @IsString()
  @Length(6, 6)
  verificationCode: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  deviceName?: string;
}

export class BackupCodesDto {
  @IsString()
  @Length(6, 6)
  verificationCode: string;
}
