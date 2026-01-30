"use client";

type ClientButtonProps = {
  className?: string;
  children: React.ReactNode;
  handleClick: () => void | Promise<void>;
};

export function ClientButton({
  children,
  handleClick,
  className,
}: ClientButtonProps) {
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
