// /var/www/praxis/frontend/src/components/ui/use-toast.jsx

// This imports the main 'toast' function from sonner.
// In most Sonner versions, 'toast' is a named export.
import { toast as sonnerToast } from 'sonner';

// Define a custom hook that wraps the sonner toast function
// This provides a consistent API like `toast({ title, description, ... })`
export const useToast = () => {
  const toast = ({
    title,
    description,
    action, // Optional: for action buttons
    ...props // Other sonner options
  }) => {
    return sonnerToast(title, {
      description,
      action,
      ...props,
    });
  };

  return { toast }; // Return an object containing the toast function
};

// You might also need a Toaster component in your root layout or app
// import { Toaster } from 'sonner';
// <Toaster />
