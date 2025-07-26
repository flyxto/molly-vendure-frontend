import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-[#AF803C] text-white shadow-xs hover:bg-[#AF803C]/80 hover:scale-95 cursor-pointer',
        filterDefault:
          'bg-white border border-white text-white shadow-xs hover:bg-[#AF803C]/80 hover:scale-95 cursor-pointer',
        addToCart:
          'bg-black text-white shadow-xs hover:bg-black/80 cursor-pointer',
        cart: 'bg-white text-black shadow-xs hover:shadow-xl  hover:scale-95 cursor-pointer',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border-2 border-[#AF803C] bg-white shadow-xs hover:bg-[#AF803C] text-[#AF803C] hover:text-white dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer hover:scale-95',
        filterOutline:
          'border border-gray-200 bg-white shadow-xs hover:bg-gray-200 text-gray-800 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer',
        clearFilter:
          'border border-gray-200 bg-white shadow-xs hover:bg-black hover:text-white text-gray-800 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer active:scale-95',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-6 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 py-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
