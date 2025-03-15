import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';
import { AuthGuard } from 'src/lib/utils/guards';
import { IUser } from 'src/core/interfaces';
import { User as UserDecorator } from 'src/lib/utils/decorators';
import { PaginationDto } from 'src/lib/utils/dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // NOTE: personalised tasks
  @UseGuards(AuthGuard)
  @Get()
  async getAllTasks(
    @UserDecorator() user: IUser,
    @Query() paginationQuery: PaginationDto,
  ) {
    console.log('paginationQuery', paginationQuery);
    const res = await this.taskService.getAllTasks(user._id, paginationQuery);

    return {
      data: res,
      message: 'All Tasks Fetched Successfully',
      success: true,
    };
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTask(
    @UserDecorator() user: IUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const res = await this.taskService.createTask(user._id, createTaskDto);

    return {
      data: res,
      message: 'Task Created Successfully',
      success: true,
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':id/status')
  async updateTaskStatus(
    @UserDecorator() user: IUser,
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    const res = await this.taskService.updateTaskStatus(
      user._id,
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
  async deleteTask(@UserDecorator() user: IUser, @Param('id') id: string) {
    const res = await this.taskService.deleteTask(user._id, id);

    return {
      data: res,
      message: 'Task Deleted Successfully',
      success: true,
    };
  }
}
