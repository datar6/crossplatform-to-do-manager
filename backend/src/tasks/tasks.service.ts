import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class TasksService {
	constructor(private prisma: PrismaService) {}

	async getAllTasks() {
		return this.prisma.task.findMany({
			orderBy: { createdAt: "desc" },
		});
	}

	async createTask(data: { title: string; description?: string }) {
		return this.prisma.task.create({
			data: {
				title: data.title,
				description: data.description,
			},
		});
	}

	async updateTask(
		id: string,
		data: { title?: string; description?: string; done?: boolean },
	) {
		return this.prisma.task.update({
			where: { id },
			data,
		});
	}

	async deleteTask(id: string) {
		return this.prisma.task.delete({
			where: { id },
		});
	}
}
