export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error && error.name === 'SequelizeUniqueConstraintError') {
    return new AppError('Já existe um registro com estes dados', 400);
  }

  if (error instanceof Error && error.name === 'SequelizeValidationError') {
    return new AppError('Erro de validação dos dados', 400);
  }

  console.error(error);
  return new AppError('Erro interno do servidor', 500);
};