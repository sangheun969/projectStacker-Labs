import { ButtonHTMLAttributes, Children, FC } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const InputVariants = cva(
  `
  p-3 w-[30rem] m-1 border rounded-md
    `,
  {
    variants: {
      variant: {
        default: " ",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// interface ButtonProps
//   extends ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof InputVariants> {
//   label?: string;
//   children?: React.ReactElement;
// }

const Input = ({ variant, size, children, label, ...props }) => {
  return <input className={cn(InputVariants({ variant, size }))} {...props} />;
};

export default Input;