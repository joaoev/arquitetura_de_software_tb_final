import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { NotFound } from '../errors/NotFound';
import { EnrollmentService } from '../services/EnrollmentService';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';
import { PaymentService } from '../services/PaymentService';
import { PaymentRepository } from '../repositories/PaymentRepository';

const createSchema = z.object({
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
  expiresAt: z.string().datetime().optional(),
  amount: z.number().positive(),
  paymentMethod: z.string().optional(),
});

const updateSchema = z.object({
  expiresAt: z.string().datetime().optional(),
});

const enrollmentRepository = new EnrollmentRepository();
const paymentRepository = new PaymentRepository();
const enrollmentService = new EnrollmentService(enrollmentRepository);
const paymentService = new PaymentService(paymentRepository, enrollmentRepository);

export async function createEnrollmentController(req: Request, res: Response) {
  try {
    const data = createSchema.parse(req.body);
    
    // Cria a matrícula
    const enrollment = await enrollmentService.create({
      userId: data.userId,
      courseId: data.courseId,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
    });

    // Cria o pagamento associado
    const payment = await paymentService.create({
      enrollmentId: enrollment.id,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
    });

    return res.status(201).json({
      ...enrollment,
      payment,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        issues: error.issues,
      });
    }
    if (error instanceof Error && error.message.includes('already enrolled')) {
      return res.status(409).json({
        error: error.message,
      });
    }
    throw error;
  }
}

export async function getEnrollmentController(req: Request, res: Response) {
  try {
    const enrollment = await enrollmentService.findById(req.params.id as string);
    return res.status(200).json(enrollment);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

export async function listEnrollmentsController(req: Request, res: Response) {
  const userId = req.query.userId as string;
  const courseId = req.query.courseId as string;
  const status = req.query.status as string;

  const enrollments = await enrollmentService.list({ userId, courseId, status: status as any });
  return res.status(200).json(enrollments);
}

export async function updateEnrollmentController(req: Request, res: Response) {
  try {
    const data = updateSchema.parse(req.body);
    const updateData: any = {};
    if (data.expiresAt) {
      updateData.expiresAt = new Date(data.expiresAt);
    }
    const enrollment = await enrollmentService.update(req.params.id as string, updateData);
    return res.status(200).json(enrollment);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        issues: error.issues,
      });
    }
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

export async function cancelEnrollmentController(req: Request, res: Response) {
  try {
    const enrollment = await enrollmentService.cancel(req.params.id as string);
    return res.status(200).json(enrollment);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

export async function deleteEnrollmentController(req: Request, res: Response) {
  try {
    await enrollmentService.delete(req.params.id as string);
    return res.status(204).json(null);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

