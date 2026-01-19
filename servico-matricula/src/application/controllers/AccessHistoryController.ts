import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { NotFound } from '../errors/NotFound';
import { AccessHistoryService } from '../services/AccessHistoryService';
import { AccessHistoryRepository } from '../repositories/AccessHistoryRepository';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';

const recordAccessSchema = z.object({
  userId: z.string().uuid(),
  enrollmentId: z.string().uuid(),
  lessonId: z.string().uuid().optional(),
  liveSessionId: z.string().uuid().optional(),
}).refine(
  (data) => data.lessonId || data.liveSessionId,
  {
    message: "Either lessonId or liveSessionId must be provided",
  }
);

const accessHistoryRepository = new AccessHistoryRepository();
const enrollmentRepository = new EnrollmentRepository();
const accessHistoryService = new AccessHistoryService(accessHistoryRepository, enrollmentRepository);

export async function recordAccessController(req: Request, res: Response) {
  try {
    const data = recordAccessSchema.parse(req.body);
    const access = await accessHistoryService.recordAccess(data);
    return res.status(201).json(access);
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
    if (error instanceof Error) {
      if (error.message.includes('not active') || error.message.includes('expired')) {
        return res.status(403).json({
          error: error.message,
        });
      }
    }
    throw error;
  }
}

export async function getAccessHistoryController(req: Request, res: Response) {
  try {
    const access = await accessHistoryService.findById(req.params.id as string);
    return res.status(200).json(access);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

export async function listAccessHistoryController(req: Request, res: Response) {
  const userId = req.query.userId as string;
  const enrollmentId = req.query.enrollmentId as string;
  const lessonId = req.query.lessonId as string;
  const liveSessionId = req.query.liveSessionId as string;

  const history = await accessHistoryService.list({
    userId,
    enrollmentId,
    lessonId,
    liveSessionId,
  });
  return res.status(200).json(history);
}

