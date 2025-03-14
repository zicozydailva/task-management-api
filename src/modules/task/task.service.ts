import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema/task.entity';
import { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';
import { ErrorHelper } from 'src/core/helpers';
import { TASK_NOT_FOUND } from 'src/core/constants';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskRepo: Model<TaskDocument>) {}

  async createTask(
    userId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    try {
      return await this.taskRepo.create({ ...createTaskDto, user: userId });
    } catch (error) {
      ErrorHelper.BadRequestException(error);
    }
  }

  async getAllTasks(userId: string): Promise<Task[]> {
    return await this.taskRepo.find({ user: userId });
  }

  async updateTaskStatus(
    userId: string,
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    try {
      const task = await this.taskRepo.findOne({ _id: id, user: userId });
      if (!task) {
        ErrorHelper.NotFoundException(TASK_NOT_FOUND);
      }
      task.status = updateTaskStatusDto.status;
      return task.save();
    } catch (error) {
      ErrorHelper.BadRequestException(error);
    }
  }

  async deleteTask(userId: string, id: string): Promise<boolean> {
    const result = await this.taskRepo
      .deleteOne({ _id: id, user: userId })
      .exec();

    if (result.deletedCount === 0) {
      ErrorHelper.NotFoundException(TASK_NOT_FOUND);
    }

    return true;
  }
}
