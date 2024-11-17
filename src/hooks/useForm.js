import { useState } from "react";

export default function useForm(inputValues= {}) {

    const [ form, setValue] = useState(inputValues);

    const handleChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    return { form, handleChange, setValue };
}
