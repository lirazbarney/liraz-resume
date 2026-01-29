import { Dispatch, SetStateAction } from "react";

type EmailNameInputProps = {
  type: "email" | "name";
  isRequired: boolean;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
};

export default function EmailNameInput({
  type,
  isRequired,
  value,
  setValue,
}: EmailNameInputProps) {
  return (
    <input
      onChange={(e) => {
        if (setValue) {
          setValue(e.target.value);
        }
      }}
      type={type === "email" ? "email" : "text"}
      name={type === "email" ? "email" : "name"}
      id={type === "email" ? "email" : "name"}
      required={isRequired}
      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30 focus:outline-none"
      placeholder={type === "email" ? "you@example.com" : "Your name"}
      defaultValue={value || undefined}
    />
  );
}
