import classnames from 'classnames'
import { forwardRef } from 'react';

const InputText = forwardRef(({ type, className, ...inputProps }, ref) => {
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
        ref={ref}
        type={type}
        className={classnames(baseClassnames, className)}
        {...inputProps}
      />
    )  
})

export default InputText;