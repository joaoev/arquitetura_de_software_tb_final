import { NotFound } from '../errors/NotFound';
import { EnrollmentRepository, CreateEnrollmentData, UpdateEnrollmentData, ListEnrollmentsFilters } from '../repositories/EnrollmentRepository';
import { EnrollmentStatus } from '../../../generated/prisma/client';

export class EnrollmentService {
  constructor(private readonly enrollmentRepository: EnrollmentRepository) {}

  async create(data: CreateEnrollmentData) {
    // Verifica se já existe matrícula ativa
    const existing = await this.enrollmentRepository.findByUserAndCourse(
      data.userId,
      data.courseId
    );

    if (existing && existing.status === EnrollmentStatus.ACTIVE) {
      throw new Error('User already enrolled in this course');
    }

    return await this.enrollmentRepository.create(data);
  }

  async findById(id: string) {
    const enrollment = await this.enrollmentRepository.findById(id);
    if (!enrollment) {
      throw new NotFound('Enrollment');
    }
    return enrollment;
  }

  async list(filters: ListEnrollmentsFilters) {
    return await this.enrollmentRepository.list(filters);
  }

  async update(id: string, data: UpdateEnrollmentData) {
    const enrollmentExists = await this.enrollmentRepository.findById(id);
    if (!enrollmentExists) {
      throw new NotFound('Enrollment');
    }
    return await this.enrollmentRepository.update(id, data);
  }

  async cancel(id: string) {
    return await this.update(id, {
      status: EnrollmentStatus.CANCELLED,
      cancelledAt: new Date(),
    });
  }

  async delete(id: string) {
    const enrollmentExists = await this.enrollmentRepository.findById(id);
    if (!enrollmentExists) {
      throw new NotFound('Enrollment');
    }
    return await this.enrollmentRepository.delete(id);
  }
}

