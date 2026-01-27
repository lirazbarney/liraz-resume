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

// type ClientButtonsGroupProps = {
//   buttons: {
//     buttonLabel: string;
//     handleClick: () => void | Promise<void>;
//   }[];
//   // buttons: ClientButtonProps[];
//   className?: string;
// };

// export function ClientButtonsGroup({
//   buttons,
//   className,
// }: ClientButtonsGroupProps) {
//   return (
//     <div>
//       {buttons.map((button, index) => {
//         return (
//           <ClientButton
//             key={index}
//             className={className}
//             handleClick={button.handleClick}
//           >
//             {button.buttonLabel}
//           </ClientButton>
//         );
//       })}
//     </div>
//   );
// }
