import { useState } from "react";

export function useForm(defaultValues) {
   const [values, setValues] = useState(defaultValues);

   function handleChange(evt) {
    const { names,value } = evt.target;
   }
}