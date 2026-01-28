import { CreateUserErrors, UserWithoutPassWord } from "@/types/user";

type UserInfoInputsProps = {
  errors?: CreateUserErrors;
  user?: UserWithoutPassWord;
  isLogin?: boolean;
};

export default function UserInfoInputs({
  errors,
  user,
  isLogin,
}: UserInfoInputsProps) {
  const isRequired = !user;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required={isRequired}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30 focus:outline-none"
          placeholder="you@example.com"
          defaultValue={user?.email || ""}
        />
        {errors?.email && (
          <p className="text-sm text-[var(--danger)]">{errors.email}</p>
        )}
      </div>

      {!isLogin && (
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required={isRequired}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30 focus:outline-none"
            placeholder="Your name"
            defaultValue={user?.name || ""}
          />
          {errors?.name && (
            <p className="text-sm text-[var(--danger)]">{errors.name}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required={isRequired}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30 focus:outline-none"
          placeholder={
            isRequired ? "Min. 8 characters" : "Leave blank to keep current"
          }
        />
        {errors?.password && (
          <p className="text-sm text-[var(--danger)]">{errors.password}</p>
        )}
      </div>

      {errors?.general && (
        <p className="rounded-lg bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]">
          {errors.general}
        </p>
      )}
    </div>
  );
}
