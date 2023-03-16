export const blockInvalidInput = (e: React.KeyboardEvent<HTMLInputElement>) =>
  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
