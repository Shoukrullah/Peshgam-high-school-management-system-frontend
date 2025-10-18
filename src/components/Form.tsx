import { RxCross1 } from "react-icons/rx";
import styles from "./Form.module.css";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import type { ReactNode } from "react";
interface Props {
  onSubmit: () => void;
  HeadingLabel?: string;
  children: ReactNode;
  isSubmitting: boolean;
  isUpdating?: boolean;
}

function Form({
  onSubmit,
  HeadingLabel,
  children,
  isSubmitting = false,
  isUpdating = false,
}: Props) {
  const navigate = useNavigate();
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {HeadingLabel && <Heading fontSize="2.5rem">{HeadingLabel}</Heading>}
      <div className={styles.allInputsContainer}>{children}</div>
      <div className="flex justifyEnd">
        <Button
          type="submit"
          fontSize="1.2rem"
          padding=".8rem 2rem"
          disabled={isSubmitting}
        >
          {/* {isUpdating ? } */}
          {isUpdating
            ? isSubmitting
              ? "Updating..."
              : "Update"
            : isSubmitting
              ? "Submitting..."
              : "Submit"}
        </Button>
        <Button
          bgcolor="var(--color-silver-100)"
          color="black"
          padding=".8rem 2rem"
          type="reset"
          margin="0 .7rem"
          fontSize="1.2rem"
        >
          Reset
        </Button>
      </div>
      <div className={styles.crossContainer} onClick={() => navigate(-1)}>
        <RxCross1 />
      </div>
    </form>
  );
}

export default Form;
