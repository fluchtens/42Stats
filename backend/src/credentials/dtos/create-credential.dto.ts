import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCredentialDto {
  @IsNotEmpty({ message: 'Provider is required' })
  @IsString({ message: 'Provider must be a string' })
  @Length(1, 100, { message: 'Provider must be between 1 and 100 characters' })
  provider: string;

  @IsNotEmpty({ message: 'Client ID is required' })
  @IsString({ message: 'Client ID must be a string' })
  @Length(1, 100, { message: 'Client ID must be between 1 and 100 characters' })
  client_id: string;

  @IsNotEmpty({ message: 'Client Secret is required' })
  @IsString({ message: 'Client Secret must be a string' })
  @Length(1, 100, {
    message: 'Client Secret must be between 1 and 100 characters',
  })
  client_secret: string;

  @IsOptional()
  @IsDateString()
  expires_at?: string;
}
