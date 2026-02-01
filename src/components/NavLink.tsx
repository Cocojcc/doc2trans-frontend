import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
	to: string;
	activeClassName?: string;
	className?: string | ((props: { isActive: boolean }) => string);
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
	({ className, activeClassName, to, children, ...props }, ref) => {
		const pathname = usePathname();
		const isActive = pathname === to;

		const computedClassName =
			typeof className === "function"
				? className({ isActive })
				: cn(className, isActive && activeClassName);

		return (
			<Link href={to} ref={ref} className={computedClassName} {...props}>
				{children}
			</Link>
		);
	},
);

NavLink.displayName = "NavLink";

export { NavLink };
