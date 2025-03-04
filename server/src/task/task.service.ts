import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: { ...dto, userId },
    });
  }

  async findAll(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, userId: string, dto: UpdateTaskDto) {
    await this.findOne(id, userId);
    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async changeStatus(status: boolean, id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.task.delete({ where: { id } });
  }
}
