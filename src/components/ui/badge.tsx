import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-soft text-brand",
        navy: "border-transparent bg-navy text-white",
        success: "border-transparent bg-success-soft text-[#15803d]",
        warning: "border-transparent bg-amber-50 text-amber-800",
        danger: "border-transparent bg-red-50 text-red-700",
        neutral: "border-transparent bg-zinc-100 text-zinc-700",
        outline: "border-zinc-300 text-zinc-700",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
