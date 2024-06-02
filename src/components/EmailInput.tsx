import { emailAtom } from "@/atoms";
import { TextField } from "@mui/material";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { z } from "zod";

const emailSchema = z
  .string({ message: "Should be a string" })
  .email({ message: "Should be a valid email" });

export function EmailInput() {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const setEmail = useSetAtom(emailAtom);

  useEffect(() => {
    if (!touched) {
      return;
    }
    setErrors([]);
    const maybeEmail = emailSchema.safeParse(inputValue);
    if (maybeEmail.success) {
      setEmail(maybeEmail.data);
    } else {
      setEmail(null);
      for (const error of maybeEmail.error.errors) {
        setErrors((prev) => [...prev, error.message]);
      }
    }
  }, [inputValue, setEmail, touched]);

  return (
    <div className="w-full">
      <TextField
        size="small"
        fullWidth
        value={inputValue}
        placeholder="Please enter your email..."
        onChange={(ev) => {
          setTouched(true);
          setInputValue(ev.target.value);
        }}
      />
      {errors.length > 0 && errors.map((message) => <div>{message}</div>)}
    </div>
  );
}
