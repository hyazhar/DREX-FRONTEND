function ErrorMessage({ message }) {
  return (
    <div className="max-w-md mx-auto my-10 p-4 bg-red-100 text-red-700 rounded-lg text-center">
      {message}
    </div>
  );
}

export default ErrorMessage;