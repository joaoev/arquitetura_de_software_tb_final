import { prismaClient } from '../libs/prismaClient';
import { PaymentStatus } from '../../../generated/prisma/client';

export interface CreatePaymentData {
  enrollmentId: string;
  amount: number;
  paymentMethod?: string;
}

export interface UpdatePaymentData {
  status?: PaymentStatus;
  transactionId?: string;
  paidAt?: Date;
}

export class PaymentRepository {
  async create(data: CreatePaymentData) {
    return await prismaClient.payment.create({
      data,
    });
  }

  async findById(id: string) {
    return await prismaClient.payment.findUnique({
      where: { id },
      include: {
        enrollment: true,
      },
    });
  }

  async findByEnrollmentId(enrollmentId: string) {
    return await prismaClient.payment.findUnique({
      where: { enrollmentId },
      include: {
        enrollment: true,
      },
    });
  }

  async update(id: string, data: UpdatePaymentData) {
    return await prismaClient.payment.update({
      where: { id },
      data,
      include: {
        enrollment: true,
      },
    });
  }

  async updateByEnrollmentId(enrollmentId: string, data: UpdatePaymentData) {
    return await prismaClient.payment.update({
      where: { enrollmentId },
      data,
      include: {
        enrollment: true,
      },
    });
  }
}

