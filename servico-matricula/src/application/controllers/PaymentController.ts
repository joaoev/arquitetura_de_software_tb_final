import { Request, Response } from 'express';
import { NotFound } from '../errors/NotFound';
import { PaymentService } from '../services/PaymentService';
import { PaymentRepository } from '../repositories/PaymentRepository';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';

const paymentRepository = new PaymentRepository();
const enrollmentRepository = new EnrollmentRepository();
const paymentService = new PaymentService(paymentRepository, enrollmentRepository);

export async function getPaymentController(req: Request, res: Response) {
  try {
    const payment = await paymentService.findById(req.params.id as string);
    return res.status(200).json(payment);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

export async function getPaymentByEnrollmentController(req: Request, res: Response) {
  try {
    const payment = await paymentService.findByEnrollmentId(req.params.enrollmentId as string);
    return res.status(200).json(payment);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

export async function processPaymentController(req: Request, res: Response) {
  try {
    const payment = await paymentService.processPayment(req.params.enrollmentId as string);
    return res.status(200).json({
      message: 'Payment processed successfully',
      payment,
    });
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

