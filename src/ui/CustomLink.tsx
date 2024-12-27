import { FC } from 'react';
import cn from 'clsx';
import { Link, LinkProps, useMatch } from 'react-router-dom';
import { icons } from 'lucide-react';

interface CustomLinkProps {
  icon: { name: keyof typeof icons; color?: string; size?: number };
  children?: string | JSX.Element | JSX.Element[];
  to: string;
  props?: LinkProps & React.RefAttributes<HTMLAnchorElement>;
  className?: string;
}
const CustomLink: FC<CustomLinkProps> = ({ icon, children, to, className, ...props }) => {
  const match = useMatch({
    path: to,
  });

  const LucideIcon = icons[icon.name];

  return (
    <>
      {icon ? (
        <Link to={to} className={cn('rounded-full flex gap-3 w-fit text-white/80 p-3 transition hover:bg-blue-100', match ? 'bg-blue-100' : '', className)} {...props}>
          <LucideIcon color={match ? '#1976d2' : '#1976d2'} size={icon.size} /> {children}
        </Link>
      ) : (
        <Link to={to} className={cn('bg-zinc-900 rounded-lg flex w-fit text-white/80 p-3 transition hover:bg-zinc-600', match && 'bg-white', className)} {...props}>
          {children}
        </Link>
      )}
    </>
  );
};

export { CustomLink };
