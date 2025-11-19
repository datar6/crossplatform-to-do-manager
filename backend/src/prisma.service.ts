import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'postgresql://todo_user:todo_pass@localhost:5432/todo_db',
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
