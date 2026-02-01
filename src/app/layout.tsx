import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Doc2Trans - Document Translation Service",
	description: "Professional document translation service. Supports Word/PDF formats. Perfectly preserves original layout and styles.",
	icons: {
		icon: "/favicon.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
