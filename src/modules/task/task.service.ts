import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema/task.entity';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/task.dto';
import { ErrorHelper } from 'src/core/helpers';

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
}
