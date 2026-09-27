import { cn } from "@/lib/cn";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Content stays visible immediately, including before JavaScript loads.
// Keep the wrapper's API while the showcase retains its own scroll animation.
export function SectionReveal({ children, className }: SectionRevealProps) {
  return <div className={cn(className)}>{children}</div>;
}
