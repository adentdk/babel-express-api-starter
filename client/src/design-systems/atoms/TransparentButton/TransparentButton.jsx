import classNames from "classnames";
import { useMemo } from "react";

function TransparentButton({ type = 'button', className, color = 'blue', children, ...props }) {
  const baseClassNames = [
    'inline-flex',
    'justify-center',
    'rounded-md',
    'border',
    'border-transparent',
    'px-4',
    'py-2',
    'text-sm',
    'font-medium',
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
  ];

  const colorClassNames = useMemo(() => ([
    `bg-${color}-100`,
    `text-${color}-900`,
    `hover:bg-${color}-200`,
    `focus-visible:ring-${color}-500`,
  ]), [color])
  return (
    <button
      type={type}
      className={classNames(baseClassNames, colorClassNames, className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default TransparentButton;
