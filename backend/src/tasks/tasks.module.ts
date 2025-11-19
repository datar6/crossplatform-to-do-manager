// backend/src/tasks/tasks.module.ts
import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
	controllers: [TasksController],
	providers: [TasksService, PrismaService],
})
export class TasksModule {}
