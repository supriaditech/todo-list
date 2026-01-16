import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('api/todo')
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.todosService.findAll(search, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create({
      title: createTodoDto.title,
      description: createTodoDto.description,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Patch(':id/toggle')
  async toggle(@Param('id') id: number) {
    return this.todosService.toggle(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.todosService.remove(id);
  }
}
