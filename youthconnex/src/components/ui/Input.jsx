export default function Input({
  label,
  error,
  errorMessage,
  className = '',
  containerClassName = '',
  ...props
}) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={props.id || props.name}>
          {label}
          {props.required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900
          focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-transparent
          transition-all duration-200 text-base
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-danger focus:ring-danger' : 'focus:ring-primary'}
          ${className}
        `}
        {...props}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
