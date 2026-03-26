import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full bg-black/[0.02] border border-black/[0.08] px-4 py-2 text-[#1A1A1A] text-sm placeholder:text-[#1A1A1A]/25 focus:border-black/20 focus:ring-1 focus:ring-black/20 focus:outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
