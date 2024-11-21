import { ChangeEvent, useState } from "react";
import { TForm } from "../types";

export default function useForm(inputValues = {}) {

    const [ form, setValue] = useState<TForm>(inputValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    return { form, handleChange, setValue };
}
