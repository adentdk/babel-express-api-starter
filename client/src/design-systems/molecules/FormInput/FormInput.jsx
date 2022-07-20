import InputLabel from "../../atoms/InputLabel";
import InputText from "../../atoms/InputText";

function FormInput ({label, id}) {
  return (
    <div>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputText id={id} />
    </div>
  )
}

export default FormInput;
