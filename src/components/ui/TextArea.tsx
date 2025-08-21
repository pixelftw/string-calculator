import type React from "react";

import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, className = "", ...props }: TextAreaProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;

      // Insert \n at cursor position
      const newValue = value.substring(0, start) + "\n" + value.substring(end);
      target.value = newValue;

      // Move cursor after the inserted \n
      target.selectionStart = target.selectionEnd = start + 1;

      // Trigger onChange event
      if (props.onChange) {
        const event = { target } as React.ChangeEvent<HTMLTextAreaElement>;
        props.onChange(event);
      }
    }

    // Call original onKeyDown if provided
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          className={`w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 placeholder:text-gray-400 resize-none min-h-[120px] ${className}`}
          onKeyDown={handleKeyDown}
          {...props}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none opacity-0 transition-opacity duration-200 peer-focus:opacity-100"></div>
      </div>
    </div>
  );
}
