import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCredentialDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100, { message: 'Client ID must be between 1 and 100 characters' })
  client_id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100, {
    message: 'Client Secret must be between 1 and 100 characters',
  })
  client_secret: string;
}
