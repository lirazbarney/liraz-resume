type InputDivProps = {
  children: React.ReactNode;
  htmlFor: string;
  label: string;
  errorMSG?: string;
  isRequired: boolean;
};
export default function InputDiv({
  htmlFor,
  label,
  errorMSG,
  children,
  isRequired,
}: InputDivProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor}>
        {label} {isRequired && <span className="text-[var(--danger)]">*</span>}
      </label>
      <div className="block text-sm font-medium text-[var(--foreground)]">
        {children}
      </div>
      {errorMSG && <p className="text-sm text-[var(--danger)]">{errorMSG}</p>}
    </div>
  );
}
