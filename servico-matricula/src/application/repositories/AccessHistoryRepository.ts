import { prismaClient } from '../libs/prismaClient';

export interface CreateAccessHistoryData {
  userId: string;
  enrollmentId: string;
  lessonId?: string;
  liveSessionId?: string;
}

export interface ListAccessHistoryFilters {
  userId?: string;
  enrollmentId?: string;
  lessonId?: string;
  liveSessionId?: string;
}

export class AccessHistoryRepository {
  async create(data: CreateAccessHistoryData) {
    return await prismaClient.accessHistory.create({
      data,
    });
  }

  async findById(id: string) {
    return await prismaClient.accessHistory.findUnique({
      where: { id },
      include: {
        enrollment: true,
      },
    });
  }

  async list(filters: ListAccessHistoryFilters) {
    const where: any = {};
    if (filters.userId) where.userId = filters.userId;
    if (filters.enrollmentId) where.enrollmentId = filters.enrollmentId;
    if (filters.lessonId) where.lessonId = filters.lessonId;
    if (filters.liveSessionId) where.liveSessionId = filters.liveSessionId;

    return await prismaClient.accessHistory.findMany({
      where,
      include: {
        enrollment: true,
      },
      orderBy: {
        accessedAt: 'desc',
      },
    });
  }
}

