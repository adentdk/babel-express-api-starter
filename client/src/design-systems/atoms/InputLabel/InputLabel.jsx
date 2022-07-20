import classnames from 'classnames'

function InputLabel ({...labelProps }) {
  const baseClassnames = [
    'text-gray-600'
  ]
  return (
    <label
      className={classnames(baseClassnames)}
      {...labelProps}
    />
  )
}

export default InputLabel