type T = Record<string, unknown>;

const successResponse = (
  statusCode: number,
  message: string,
  data: T | null = null
) => {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
};

const errorResponse = (statusCode: number, message: string) => {
  return {
    success: false,
    statusCode,
    message,
    data: null,
  };
};

export { successResponse, errorResponse };
