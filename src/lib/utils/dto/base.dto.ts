import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class AttachmentDTO {
  @IsUrl()
  @IsNotEmpty({
    message: 'Please provide a valid video url',
  })
  url: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  size: number;
}
