import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    const res = await this.taskService.getAllTasks();

    return {
      data: res,
      message: 'All Tasks Fetched Successfully',
      success: true,
    };
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const res = await this.taskService.createTask(createTaskDto);

    return {
      data: res,
      message: 'Task Created Successfully',
      success: true,
    };
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    const res = await this.taskService.updateTaskStatus(
      id,
      updateTaskStatusDto,
    );

    return {
      data: res,
      message: 'Task Updated Successfully',
      success: true,
    };
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const res = await this.taskService.deleteTask(id);

    return {
      data: res,
      message: 'Task Deleted Successfully',
      success: true,
    };
  }
}
