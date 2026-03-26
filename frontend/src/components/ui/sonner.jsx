import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#1A1A1A] group-[.toaster]:border-black/[0.08] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#6B6B6B]",
          actionButton:
            "group-[.toast]:bg-[#1A1A1A] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-black/[0.05] group-[.toast]:text-[#1A1A1A]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
