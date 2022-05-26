type ValidateErrorProps = {
  message: string | undefined;
};

function ValidateError({ message }: ValidateErrorProps) {
  return (
    <span className="text-red-600 pl-2" data-testid="form-error">
      {message}
    </span>
  );
}

export default ValidateError;
