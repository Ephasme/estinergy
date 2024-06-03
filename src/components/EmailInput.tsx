import { emailAtom } from "@/atoms";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { z } from "zod";

const emailSchema = z
  .string({ message: "Should be a string" })
  .email({ message: "Should be a valid email" });

export function EmailInput() {
  const [inputValue, setInputValue] = useState("");
  const [blurred, setBlurred] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const hasErrors = errors.length > 0;
  const setEmail = useSetAtom(emailAtom);

  useEffect(() => {
    if (!blurred) {
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
  }, [inputValue, setEmail, blurred]);

  return (
    <div className="relative">
      <input
        className="w-full bg-[#001846] px-4 py-3 outline-none text-sm rounded-lg placeholder-[#3D5B8C]"
        value={inputValue}
        placeholder="loup.peluso@gmail.com"
        onChange={(ev) => {
          setInputValue(ev.target.value);
        }}
        onBlur={() => setBlurred(true)}
      />
      <div className="absolute -bottom-2 translate-y-[100%]">
        {hasErrors &&
          errors.map((message) => (
            <div className="bg-[#E93535] px-3 py-1 rounded-lg text-white text-sm">
              {message}
            </div>
          ))}
      </div>
    </div>
  );
}
