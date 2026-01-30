import { CreateUserErrors, UserWithoutPassWord } from "@/types/user";
import { Dispatch, SetStateAction } from "react";
import EmailNameInput from "./email-name-input";
import InputDiv from "./input-div";
import PasswordInput from "./password-input";

type UserInfoInputsProps = {
  errors?: CreateUserErrors;
  type: "login" | "signup" | "edit";
  oldEmail?: {
    email: string | undefined;
    setEmail?: Dispatch<SetStateAction<string>>;
  };
  oldName?: {
    name: string | undefined;
    setName?: Dispatch<SetStateAction<string>>;
  };
};

export default function UserInfoInputs({
  errors,
  type,
  oldEmail,
  oldName,
}: UserInfoInputsProps) {
  const isRequired = type === "signup" || type === "login";
  return (
    <div className="space-y-5">
      <InputDiv
        htmlFor="email"
        label="Email"
        errorMSG={(errors?.email as string) || undefined}
        isRequired={isRequired}
      >
        <EmailNameInput
          type="email"
          isRequired={isRequired}
          setValue={oldEmail?.setEmail}
          value={oldEmail?.email || undefined}
        />
      </InputDiv>

      {type !== "login" && (
        <InputDiv
          htmlFor="name"
          label="Name"
          errorMSG={(errors?.name as string) || undefined}
          isRequired={isRequired}
        >
          <EmailNameInput
            type="name"
            isRequired={isRequired}
            setValue={oldName?.setName}
            value={oldName?.name || undefined}
          />
        </InputDiv>
      )}

      <InputDiv
        htmlFor="password"
        label="Password"
        errorMSG={(errors?.password as string) || undefined}
        isRequired={isRequired}
      >
        <PasswordInput isRequired={isRequired} type="password" />
      </InputDiv>

      {type !== "login" && (
        <InputDiv
          htmlFor="confirmPassword"
          label="Confirm Password"
          isRequired={isRequired}
        >
          <PasswordInput isRequired={isRequired} type="confirmPassword" />
        </InputDiv>
      )}

      {errors?.general && (
        <p className="text-sm text-[var(--danger)]">{errors.general}</p>
      )}
    </div>
  );
}
