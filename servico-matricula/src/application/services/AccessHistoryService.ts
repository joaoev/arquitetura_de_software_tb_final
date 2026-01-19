import { NotFound } from '../errors/NotFound';
import { AccessHistoryRepository, CreateAccessHistoryData, ListAccessHistoryFilters } from '../repositories/AccessHistoryRepository';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';
import { EnrollmentStatus } from '../../../generated/prisma/client';

export class AccessHistoryService {
  constructor(
    private readonly accessHistoryRepository: AccessHistoryRepository,
    private readonly enrollmentRepository: EnrollmentRepository
  ) {}

  async recordAccess(data: CreateAccessHistoryData) {
    // Verifica se a matrícula está ativa
    const enrollment = await this.enrollmentRepository.findById(data.enrollmentId);
    if (!enrollment) {
      throw new NotFound('Enrollment');
    }

    if (enrollment.status !== EnrollmentStatus.ACTIVE) {
      throw new Error('Enrollment is not active');
    }

    // Verifica se não expirou
    if (enrollment.expiresAt && enrollment.expiresAt < new Date()) {
      await this.enrollmentRepository.update(data.enrollmentId, {
        status: EnrollmentStatus.EXPIRED,
      });
      throw new Error('Enrollment has expired');
    }

    return await this.accessHistoryRepository.create(data);
  }

  async findById(id: string) {
    const access = await this.accessHistoryRepository.findById(id);
    if (!access) {
      throw new NotFound('AccessHistory');
    }
    return access;
  }

  async list(filters: ListAccessHistoryFilters) {
    return await this.accessHistoryRepository.list(filters);
  }
}

