import classnames from 'classnames'

function InputText({ type, className, ...inputProps }) {
  const baseClassnames = [
    "w-full",
    "py-2",
    "px-4",
    "bg-gray-100",
    "text-gray-700",
    "focus:outline-1",
    "focus:outline-blue-400"
  ]
  return (
    <input
      type={type}
      className={classnames(baseClassnames, className)}
      {...inputProps}
    />
  )
}

export default InputText;