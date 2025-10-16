import type { CSSProperties } from "react";

interface Props {
    submitForm?: ()=> void;
    children: React.ReactNode
}

function Form({submitForm,children}:Props) {

    const style:CSSProperties = {

    }

    // return this
    return (
        <form onSubmit={submitForm}>
            {children}
        </form>
    )
}

export default Form;

function FormRow() {
    return (
        <div>
            <label htmlFor=""></label>
        </div>
    )
}

export {FormRow}

