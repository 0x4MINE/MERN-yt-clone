export const createSuccess = (status, message) => {
  return {
    success: true,
    status: status,
    message: message,
  };
};
