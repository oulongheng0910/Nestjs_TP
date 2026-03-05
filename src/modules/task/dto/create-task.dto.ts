import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Task name must be a string' })
  @MinLength(3, { message: 'Task name must be at least 3 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
