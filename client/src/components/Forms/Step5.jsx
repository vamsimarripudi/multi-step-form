import {useState} from "react";
const Submit = ({formData, updateFormData}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    updateFormData({ isConfirmed: isChecked });

    return (
      <div className="submit-container">
        <h2>Review Your Information</h2>
        <p>Please review your information before submitting.</p>
        <div>
            <input type="checkbox" id="confirm" name="confirm" />
            <label htmlFor="confirm"> I confirm that the above information is correct.</label>
        </div>
      </div>
    );
  }
export default Submit