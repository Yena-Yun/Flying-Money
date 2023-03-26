export const blockInvalidInput = (
  e: React.KeyboardEvent<HTMLInputElement>
): false | void => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
