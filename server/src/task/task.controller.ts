import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateTaskDto) {
    console.log(req.user);
    return this.taskService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Req() req) {
    return this.taskService.findAll(req.user.id);
  }

  @Put(':id')
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(id, req.user.id, dto);
  }

  @Patch(':id')
  changeStatus(
    @Req() req,
    @Param('id') id: string,
    @Body()
    body: {
      status: boolean;
    },
  ) {
    return this.taskService.changeStatus(body.status, id, req.user.id);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.taskService.remove(id, req.user.id);
  }
}
