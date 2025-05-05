import React from 'react';
import { forwardRef } from 'react';

// Utility function to merge class names (like Tailwind classes)
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Button = forwardRef(({ className, children, variant, size, ...props }, ref) => {
  let buttonClassName = cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-primary/90 h-10 px-4 py-2",
    className
  );

  switch (variant) {
    case "outline":
      buttonClassName = cn(buttonClassName, "border border-input bg-background hover:bg-accent hover:text-accent-foreground");
      break;
    case "secondary":
      buttonClassName = cn(buttonClassName, "bg-secondary text-secondary-foreground hover:bg-secondary/80");
      break;
    case "ghost":
      buttonClassName = cn(buttonClassName, "hover:bg-accent hover:text-accent-foreground");
      break;
    case "link":
      buttonClassName = cn(buttonClassName, "hover:underline underline-offset-4");
      break;
    default:
      buttonClassName = cn(buttonClassName, "bg-primary text-primary-foreground shadow-sm");
  }

  switch (size) {
    case "sm":
      buttonClassName = cn(buttonClassName, "h-9 px-3 rounded-md");
      break;
    case "lg":
      buttonClassName = cn(buttonClassName, "h-11 px-8 rounded-md");
      break;
    case "icon":
      buttonClassName = cn(buttonClassName, "h-10 w-10");
      break;
  }

  return (
    <button className={buttonClassName} ref={ref} {...props}>
      {children}
    </button>
  );
});
Button.displayName = "Button";

export { Button };

// How to use this component:
// <Button>Click me</Button>
// <Button variant="secondary">Secondary Button</Button>
