export class BadRequestError extends Error {
  constructor(payload?: string | { [x: string]: string }) {
    super();
    this.name = 'BadRequestError';
    if (typeof payload === 'string') {
      this.message = payload;
    } else if (payload && payload.message) {
      this.message = payload.message;
    } else {
      this.message = 'Bad Request';
    }
  }
}

export class UnauthorizedError extends Error {
  constructor(payload?: string) {
    super();
    this.name = 'UnauthorizedError';
    this.message = payload || 'Unauthorized';
  }
}
