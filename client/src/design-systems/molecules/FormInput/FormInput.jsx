import { forwardRef } from "react";
import InputLabel from "../../atoms/InputLabel";
import InputText from "../../atoms/InputText";

const FormInput = forwardRef(({label, id, className, ...inputProps}, ref) => {
  return (
    <div className={className}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputText id={id} {...inputProps} ref={ref} />
    </div>
  )
})

export default FormInput;
