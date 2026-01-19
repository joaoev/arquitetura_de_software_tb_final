import { prismaClient } from '../libs/prismaClient';
import { EnrollmentStatus } from '../../../generated/prisma/client';

export interface CreateEnrollmentData {
  userId: string;
  courseId: string;
  expiresAt?: Date;
}

export interface UpdateEnrollmentData {
  status?: EnrollmentStatus;
  expiresAt?: Date;
  cancelledAt?: Date;
}

export interface ListEnrollmentsFilters {
  userId?: string;
  courseId?: string;
  status?: EnrollmentStatus;
}

export class EnrollmentRepository {
  async create(data: CreateEnrollmentData) {
    return await prismaClient.enrollment.create({
      data,
      include: {
        payment: true,
      },
    });
  }

  async findById(id: string) {
    return await prismaClient.enrollment.findUnique({
      where: { id },
      include: {
        payment: true,
        accessHistory: {
          orderBy: {
            accessedAt: 'desc',
          },
          take: 10,
        },
      },
    });
  }

  async list(filters: ListEnrollmentsFilters) {
    const where: any = {};
    if (filters.userId) where.userId = filters.userId;
    if (filters.courseId) where.courseId = filters.courseId;
    if (filters.status) where.status = filters.status;

    return await prismaClient.enrollment.findMany({
      where,
      include: {
        payment: true,
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    });
  }

  async update(id: string, data: UpdateEnrollmentData) {
    return await prismaClient.enrollment.update({
      where: { id },
      data,
      include: {
        payment: true,
      },
    });
  }

  async delete(id: string) {
    return await prismaClient.enrollment.delete({
      where: { id },
    });
  }

  async findByUserAndCourse(userId: string, courseId: string) {
    return await prismaClient.enrollment.findFirst({
      where: {
        userId,
        courseId,
      },
      include: {
        payment: true,
      },
    });
  }
}

