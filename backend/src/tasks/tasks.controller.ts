import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	async getTasks() {
		return this.tasksService.getAllTasks();
	}

    @Post()
    async createTask(@Body() data: { title: string; description?: string }) {
    return this.tasksService.createTask(data);
  }

   @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() data: { title?: string; description?: string; done?: boolean }
  ) {
    return this.tasksService.updateTask(id, data);
  }

    @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}

