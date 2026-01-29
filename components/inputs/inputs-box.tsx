interface InputsBoxProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function InputsBox({
  title,
  description,
  children,
}: InputsBoxProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col justify-center px-4 py-12 sm:py-16">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl sm:p-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-[var(--muted)]">{description}</p>
        </div>

        {children}
      </div>
    </main>
  );
}
