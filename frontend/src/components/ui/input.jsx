import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full bg-white/[0.03] border border-white/[0.08] px-4 py-2 text-white text-sm placeholder:text-white/25 focus:border-white/20 focus:ring-1 focus:ring-white/20 focus:outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
