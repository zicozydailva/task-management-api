import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';
import { AuthGuard } from 'src/lib/utils/guards';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // TODO: personalised tasks
  @UseGuards(AuthGuard)
  @Get()
  async getAllTasks() {
    const res = await this.taskService.getAllTasks();

    return {
      data: res,
      message: 'All Tasks Fetched Successfully',
      success: true,
    };
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const res = await this.taskService.createTask(createTaskDto);

    return {
      data: res,
      message: 'Task Created Successfully',
      success: true,
    };
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
