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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskRepo.create(createTaskDto);
    } catch (error) {
      ErrorHelper.BadRequestException(error);
    }
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepo.find({});
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    try {
      const task = await this.taskRepo.findById(id);
      if (!task) {
        ErrorHelper.NotFoundException(TASK_NOT_FOUND);
      }
      task.status = updateTaskStatusDto.status;
      return task.save();
    } catch (error) {
      ErrorHelper.BadRequestException(error);
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await this.taskRepo.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      ErrorHelper.NotFoundException(TASK_NOT_FOUND);
    }

    return true;
  }
}
