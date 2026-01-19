import express from 'express';
import cors from 'cors';
import { env } from '../application/config/env';
import {
  createEnrollmentController,
  getEnrollmentController,
  listEnrollmentsController,
  updateEnrollmentController,
  cancelEnrollmentController,
  deleteEnrollmentController,
} from '../application/controllers/EnrollmentController';
import {
  getPaymentController,
  getPaymentByEnrollmentController,
  processPaymentController,
} from '../application/controllers/PaymentController';
import {
  recordAccessController,
  getAccessHistoryController,
  listAccessHistoryController,
} from '../application/controllers/AccessHistoryController';

const app = express();

app.use(express.json());
app.use(cors());

// Rotas de Matrículas (Enrollments)
app.get('/enrollments', listEnrollmentsController);
app.get('/enrollments/:id', getEnrollmentController);
app.post('/enrollments', createEnrollmentController);
app.put('/enrollments/:id', updateEnrollmentController);
app.patch('/enrollments/:id/cancel', cancelEnrollmentController);
app.delete('/enrollments/:id', deleteEnrollmentController);

// Rotas de Pagamentos (Payments)
app.get('/payments/:id', getPaymentController);
app.get('/enrollments/:enrollmentId/payment', getPaymentByEnrollmentController);
app.post('/enrollments/:enrollmentId/payment/process', processPaymentController);

// Rotas de Histórico de Acesso (Access History)
app.get('/access-history', listAccessHistoryController);
app.get('/access-history/:id', getAccessHistoryController);
app.post('/access-history', recordAccessController);

app.listen(parseInt(env.port), () => {
  console.log(`Serviço de Matrículas rodando na porta ${env.port}`);
});

