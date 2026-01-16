import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: 'Title harus berupa teks' })
  @IsNotEmpty({ message: 'Title tidak boleh kosong' })
  @MinLength(3, { message: 'Title minimal 3 karakter' })
  @MaxLength(100, { message: 'Title maksimal 100 karakter' })
  title: string;

  @IsString({ message: 'Description harus berupa teks' })
  @IsNotEmpty({ message: 'Description tidak boleh kosong' })
  @MinLength(5, { message: 'Description terlalu pendek, minimal 5 karakter' })
  description: string;
}
