interface InputProps {
  type?: 'text' | 'number';
  name: string;
  value?: string;
  className?: string;
  placeholder: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => false | void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  return <input {...props} />;
};

Input.defaultProps = {
  type: 'text',
};
