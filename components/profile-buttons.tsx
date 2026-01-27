"use client";

import { redirect } from "next/navigation";

import { deleteUserAction, logoutAction } from "@/lib/actions";

type ProfileButtonsProps = {
  userId: number;
};

export default function ProfileButtons({ userId }: ProfileButtonsProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => {
          redirect("/profile/edit");
        }}
      >
        edit profile
      </button>
      <button
        onClick={() => {
          deleteUserAction(userId, "/");
        }}
      >
        delete profile
      </button>
      <button onClick={logoutAction}>log out</button>
    </div>
  );
}
