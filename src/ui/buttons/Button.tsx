import cn from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...rest }: PropsWithChildren<TypeButton>) {
  return (
    <button className={cn('bg-blue-800 rounded-lg text-sm text-white/80 py-2 px-5 transition hover:bg-zinc-600 active:bg-zinc-600', className)} {...rest}>
      {children}
    </button>
  );
}
