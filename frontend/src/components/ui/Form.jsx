import React, { createContext, useContext } from 'react';
import { useFormContext } from 'react-hook-form';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const FormContext = createContext({});

const Form = ({ children, ...props }) => {
  const methods = useFormContext();
  return <form {...props} {...methods}>{children}</form>;
};

const FormItem = ({ className, ...props }) => (
  <div className={cn("space-y-2", className)} {...props} />
);

const FormLabel = React.forwardRef(({ className, ...props }, ref) => (
  <label
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    ref={ref}
    {...props}
  />
));
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn("relative", className)} ref={ref} {...props} />
));
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(({ className, ...props }, ref) => (
  <p
    className={cn("text-sm font-medium text-red-600", className)}
    ref={ref}
    {...props}
  />
));
FormMessage.displayName = "FormMessage";

const FormField = ({ control, ...props }) => {
  return (
    <FormContext.Provider value={{ control }}>
      {props.children}
    </FormContext.Provider>
  );
};

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };

// How to use these components:
// In your component:
// import { useForm } from 'react-hook-form';
// import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from './Form'; // Adjust path

// const MyForm = () => {
//   const form = useForm();

//   return (
//     <Form {...form} >
//       <FormField
//         control={form.control}
//         name="email"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Email</FormLabel>
//             <FormControl>
//               <Input {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </Form>
//   );
// };
