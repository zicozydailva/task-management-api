import { IsArray, IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class UserSubscriptionDto {
  @IsString()
  @IsOptional()
  productId?: string;

  @IsOptional()
  @IsDateString()
  @MaxLength(10)
  expiryDate: string;
}

export class SubscriptionDto {
  @IsString()
  @IsOptional()
  course?: string;

  @IsOptional()
  @IsDateString()
  expiry_date: string;

  @IsString()
  @IsOptional()
  planId?: string;

  @IsString()
  @IsOptional()
  learning_method?: string;

  @IsArray()
  @IsOptional()
  cohortId?: string[];

  @IsArray()
  @IsOptional()
  programId?: string[];
}
