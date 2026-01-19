import { NotFound } from '../errors/NotFound';
import { PaymentRepository, CreatePaymentData, UpdatePaymentData } from '../repositories/PaymentRepository';
import { PaymentStatus } from '../../../generated/prisma/client';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';
import { EnrollmentStatus } from '../../../generated/prisma/client';

export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly enrollmentRepository: EnrollmentRepository
  ) {}

  async create(data: CreatePaymentData) {
    // Gera um transactionId simulado
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return await this.paymentRepository.create({
      ...data,
      transactionId,
    });
  }

  async findById(id: string) {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new NotFound('Payment');
    }
    return payment;
  }

  async findByEnrollmentId(enrollmentId: string) {
    const payment = await this.paymentRepository.findByEnrollmentId(enrollmentId);
    if (!payment) {
      throw new NotFound('Payment');
    }
    return payment;
  }

  async processPayment(enrollmentId: string) {
    const payment = await this.paymentRepository.findByEnrollmentId(enrollmentId);
    if (!payment) {
      throw new NotFound('Payment');
    }

    // Simula processamento de pagamento (sempre aprovado no exemplo)
    const updatedPayment = await this.paymentRepository.updateByEnrollmentId(enrollmentId, {
      status: PaymentStatus.COMPLETED,
      paidAt: new Date(),
    });

    // Atualiza status da matrícula para ativa
    await this.enrollmentRepository.update(enrollmentId, {
      status: EnrollmentStatus.ACTIVE,
    });

    return updatedPayment;
  }

  async update(id: string, data: UpdatePaymentData) {
    const paymentExists = await this.paymentRepository.findById(id);
    if (!paymentExists) {
      throw new NotFound('Payment');
    }
    return await this.paymentRepository.update(id, data);
  }
}

