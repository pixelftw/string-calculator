import type { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  type: "error" | "success";
  className?: string;
}

export function Alert({ children, type, className = "" }: AlertProps) {
  const typeClasses = {
    error: {
      container:
        "bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400",
      dot: "bg-red-400",
      icon: "bg-red-100",
      iconDot: "bg-red-500",
      text: "text-red-700",
    },
    success: {
      container:
        "bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-400",
      dot: "bg-emerald-400",
      icon: "bg-emerald-100",
      iconDot: "bg-emerald-500",
      text: "text-emerald-700",
    },
  };

  const classes = typeClasses[type];

  return (
    <div
      className={`relative p-4 ${classes.container} rounded-xl shadow-sm animate-fade-in-down ${className}`}
    >
      <div
        className={`absolute top-2 right-2 w-2 h-2 ${classes.dot} rounded-full animate-pulse`}
      ></div>
      <div className={`${classes.text} flex items-center gap-2`}>
        <span
          className={`w-4 h-4 ${classes.icon} rounded-full flex items-center justify-center`}
        >
          <span className={`w-2 h-2 ${classes.iconDot} rounded-full`}></span>
        </span>
        {children}
      </div>
    </div>
  );
}
