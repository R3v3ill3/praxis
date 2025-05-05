import React, { forwardRef } from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const FormMessage = forwardRef(({ className, ...props }, ref) => (
  <p
    className={cn("text-sm font-medium text-red-600", className)}
    ref={ref}
    {...props}
  />
));
FormMessage.displayName = "FormMessage";

export { FormMessage };
