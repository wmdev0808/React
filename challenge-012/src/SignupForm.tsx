import useForm from "./useForm";
import { signupForm } from "./utils/formConfig";
import "./styles.css";
import "./SignupForm.css";

export default function SingupForm() {
  const { renderFormInputs, isFormValid } = useForm(signupForm);

  return (
    <form className="signupForm">
      <h1>Sign Up</h1>
      {renderFormInputs()}
      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
}
