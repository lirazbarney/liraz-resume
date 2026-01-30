"use client";

import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { useState } from "react";

type PasswordInputProps = {
  isRequired: boolean;
  type: "password" | "confirmPassword";
};
export default function PasswordInput({
  isRequired,
  type,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30 focus:outline-none flex items-end">
      <input
        type={showPassword ? "text" : "password"}
        name={type}
        id={type}
        required={isRequired}
        placeholder={
          isRequired ? "Min. 8 characters" : "Leave blank to keep current"
        }
        className="w-full bg-transparent outline-none"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="text-[var(--foreground)]"
      >
        {showPassword ? <LuEye /> : <LuEyeClosed />}
      </button>
    </div>
  );
}
