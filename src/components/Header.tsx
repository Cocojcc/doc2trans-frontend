import { FileText, History, User, LogIn } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
	isLoggedIn: boolean;
	onLoginClick: () => void;
	onHistoryClick: () => void;
}

const Header = ({ isLoggedIn, onLoginClick, onHistoryClick }: HeaderProps) => {
	return (
		<header className="w-full py-4 px-6 flex items-center justify-between border-b-2 border-foreground bg-background/80 backdrop-blur-sm sticky top-0 z-50">
			<div className="flex items-center gap-3 rotate-slight-left">
				<div className="w-10 h-10 bg-primary border-2 border-foreground shadow-hard-sm wobbly-border-sm flex items-center justify-center">
					<FileText className="w-5 h-5 text-primary-foreground" />
				</div>
				<h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">Docu2Trans</h1>
			</div>

			<nav className="flex items-center gap-2 md:gap-4">
				{isLoggedIn ? (
					<>
						<Button variant="ghost" size="sm" onClick={onHistoryClick} className="gap-2">
							<History className="w-4 h-4" />
							<span className="hidden md:inline">History</span>
						</Button>
						<div className="flex items-center gap-2 px-3 py-2 border-2 border-foreground bg-muted wobbly-border-sm shadow-hard-sm">
							<User className="w-4 h-4" />
							<span className="hidden md:inline font-body">Alex</span>
						</div>
					</>
				) : (
					<Button variant="outline" size="sm" onClick={onLoginClick} className="gap-2">
						<LogIn className="w-4 h-4" />
						<span>Sign in</span>
					</Button>
				)}
			</nav>
		</header>
	);
};

export default Header;
