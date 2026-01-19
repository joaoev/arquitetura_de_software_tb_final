# Serviço de Matrículas e Acesso

Serviço responsável pelo gerenciamento de matrículas de estudantes em cursos, processamento de pagamentos (simulado) e histórico de acesso às aulas.

## Tecnologias

- Node.js
- Express.js
- Prisma ORM
- Zod (validação)
- TypeScript

## Estrutura

O serviço segue uma arquitetura simples:

- **Controllers**: Funções Express que recebem requisições HTTP, validam dados com Zod e retornam respostas
- **Services**: Contêm a lógica de negócio
- **Repositories**: Acesso ao banco de dados via Prisma

## Configuração

1. Instale as dependências:
```bash
pnpm install
```

2. Configure as variáveis de ambiente criando um arquivo `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5435/matriculas?schema=public"
PORT=3004
```

3. Execute as migrações do Prisma:
```bash
pnpm prisma:migrate
```

4. Gere o cliente Prisma:
```bash
pnpm prisma:generate
```

5. Inicie o servidor:
```bash
pnpm dev
```

## Rotas

### Matrículas (Enrollments)

- `GET /enrollments` - Lista todas as matrículas
  - Query params: `userId`, `courseId`, `status`
- `GET /enrollments/:id` - Busca uma matrícula específica
- `POST /enrollments` - Cria uma nova matrícula (com pagamento)
- `PUT /enrollments/:id` - Atualiza uma matrícula
- `PATCH /enrollments/:id/cancel` - Cancela uma matrícula
- `DELETE /enrollments/:id` - Remove uma matrícula

### Pagamentos (Payments)

- `GET /payments/:id` - Busca um pagamento específico
- `GET /enrollments/:enrollmentId/payment` - Busca pagamento por matrícula
- `POST /enrollments/:enrollmentId/payment/process` - Processa pagamento (simulado)

### Histórico de Acesso (Access History)

- `GET /access-history` - Lista histórico de acesso
  - Query params: `userId`, `enrollmentId`, `lessonId`, `liveSessionId`
- `GET /access-history/:id` - Busca um registro específico
- `POST /access-history` - Registra acesso a uma aula/sessão

## Modelo de Dados

### Enrollment (Matrícula)
- `id`: UUID
- `userId`: ID do estudante
- `courseId`: ID do curso
- `status`: ACTIVE, EXPIRED, CANCELLED, PENDING
- `enrolledAt`: Data de matrícula
- `expiresAt`: Data de expiração (opcional)
- `cancelledAt`: Data de cancelamento (opcional)
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

### Payment (Pagamento)
- `id`: UUID
- `enrollmentId`: ID da matrícula
- `amount`: Valor do pagamento
- `status`: PENDING, COMPLETED, FAILED, REFUNDED
- `paymentMethod`: Método de pagamento (opcional)
- `transactionId`: ID da transação (gerado automaticamente)
- `paidAt`: Data do pagamento (opcional)
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

### AccessHistory (Histórico de Acesso)
- `id`: UUID
- `userId`: ID do usuário
- `enrollmentId`: ID da matrícula
- `lessonId`: ID da aula (opcional)
- `liveSessionId`: ID da sessão ao vivo (opcional)
- `accessedAt`: Data e hora do acesso

## Exemplos de Requisição

### Criar Matrícula com Pagamento

```json
POST /enrollments

{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "courseId": "123e4567-e89b-12d3-a456-426614174001",
  "amount": 299.99,
  "paymentMethod": "credit_card",
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

### Processar Pagamento

```json
POST /enrollments/{enrollmentId}/payment/process

Resposta:
{
  "message": "Payment processed successfully",
  "payment": {
    "id": "...",
    "status": "COMPLETED",
    "paidAt": "2024-12-20T10:00:00Z"
  }
}
```

### Registrar Acesso a Aula

```json
POST /access-history

{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "enrollmentId": "123e4567-e89b-12d3-a456-426614174002",
  "lessonId": "123e4567-e89b-12d3-a456-426614174003"
}
```

### Cancelar Matrícula

```json
PATCH /enrollments/{id}/cancel
```

## Fluxo de Matrícula

1. **Criar Matrícula**: `POST /enrollments` - Cria matrícula com status PENDING e pagamento PENDING
2. **Processar Pagamento**: `POST /enrollments/{id}/payment/process` - Simula pagamento e ativa matrícula
3. **Acessar Aulas**: `POST /access-history` - Registra acesso (verifica se matrícula está ativa)
4. **Cancelar (opcional)**: `PATCH /enrollments/{id}/cancel` - Cancela matrícula

## Observações

- Este serviço não possui autenticação/autorização. Todas as rotas são públicas.
- O pagamento é simulado e sempre aprovado automaticamente.
- O sistema verifica se a matrícula está ativa antes de permitir acesso às aulas.
- Matrículas expiradas são automaticamente marcadas como EXPIRED ao tentar acessar.

