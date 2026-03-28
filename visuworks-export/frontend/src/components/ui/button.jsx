import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-[13px] font-medium tracking-[0.02em] uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#1A1A1A] text-white border border-[#1A1A1A] hover:bg-[#1A1A1A]/90 active:bg-[#1A1A1A]/80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        secondary:
          "border border-black/10 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:border-black/20 hover:bg-black/[0.03] active:bg-black/[0.02] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        ghost: "text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-black/[0.04] transition-all duration-300",
        link: "text-[#1A1A1A]/70 hover:text-[#1A1A1A] underline-offset-4 hover:underline transition-colors duration-300",
      },
      size: {
        default: "h-11 px-7",
        sm: "h-9 px-5 text-[11px]",
        lg: "h-12 px-9 text-[13px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
