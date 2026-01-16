import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const whereCondition = {
      deletedAt: null,
      title: { contains: search || '' },
    };

    try {
      const [data, total] = await this.prisma.$transaction([
        this.prisma.todo.findMany({
          where: whereCondition,
          take: Number(limit),
          skip: Number(skip),
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.todo.count({ where: whereCondition }),
      ]);

      return {
        statusCode: HttpStatus.OK,
        message: 'Berhasil mengambil daftar todo',
        data,
        meta: {
          total,
          page: Number(page),
          limit: Number(limit),
          last_page: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      this.handleError(error, 'Gagal mengambil data todo');
    }
  }

  async findOne(id: number) {
    await this.checkExistence(id);

    try {
      const data = await this.prisma.todo.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Berhasil mengambil detail todo',
        data,
      };
    } catch (error) {
      this.handleError(error, 'Gagal mengambil detail todo');
    }
  }

  async create(data: { title: string; description: string }) {
    try {
      const todo = await this.prisma.todo.create({
        data: { title: data.title, description: data.description },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Berhasil membuat todo baru',
        data: todo,
      };
    } catch (error) {
      this.handleError(error, 'Gagal membuat todo baru');
    }
  }

  async update(id: number, data: UpdateTodoDto) {
    await this.checkExistence(id);

    try {
      const updatedTodo = await this.prisma.todo.update({
        where: { id },
        data: {
          ...data,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Berhasil memperbarui data todo',
        data: updatedTodo,
      };
    } catch (error) {
      this.handleError(error, 'Gagal update todo');
    }
  }

  async toggle(id: number) {
    await this.checkExistence(id);

    try {
      const updatedTodo = await this.prisma.todo.update({
        where: { id },
        data: {
          completed:
            (await this.prisma.todo.findUnique({ where: { id } }))
              ?.completed === false,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Berhasil mengubah status todo',
        data: updatedTodo,
      };
    } catch (error) {
      this.handleError(error, 'Gagal update status todo');
    }
  }

  async remove(id: number) {
    await this.checkExistence(id);

    try {
      const deletedTodo = await this.prisma.todo.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Berhasil menghapus todo',
        data: deletedTodo,
      };
    } catch (error) {
      this.handleError(error, 'Gagal menghapus todo');
    }
  }

  private async checkExistence(id: number) {
    const todo = await this.prisma.todo.findFirst({
      where: { id, deletedAt: null },
    });

    if (!todo) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Todo dengan ID ${id} tidak ditemukan`,
        error: 'Not Found',
      });
    }
  }

  private handleError(error: any, customMessage: string): never {
    if (error instanceof Error) {
      this.logger.error(`${customMessage}: ${error.message}`, error.stack);
    } else {
      this.logger.error(`${customMessage}: Unknown error`, String(error));
    }
    throw new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: customMessage,
      error: 'Internal Server Error',
    });
  }
}
