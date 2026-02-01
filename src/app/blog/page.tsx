import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog - DocLayout Translator",
	description: "Read our latest updates and guides on document translation and layout preservation.",
};

const blogPosts = [
	{
		slug: "introducing-doclayout-translator",
		title: "Introducing DocLayout Translator",
		excerpt: "Translate your documents while keeping the original layout intact.",
		date: "2024-01-15",
	},
	{
		slug: "best-practices-for-document-translation",
		title: "Best Practices for Document Translation",
		excerpt: "How to prepare your documents for the best translation results.",
		date: "2024-01-20",
	},
];

export default function BlogIndex() {
	return (
		<div className="container py-12">
			<h1 className="text-4xl font-bold mb-8 font-heading">Blog</h1>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{blogPosts.map((post) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="group block p-6 border rounded-lg hover:shadow-lg transition-shadow bg-card text-card-foreground"
					>
						<h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
							{post.title}
						</h2>
						<p className="text-muted-foreground mb-4">{post.excerpt}</p>
						<span className="text-sm text-muted-foreground">{post.date}</span>
					</Link>
				))}
			</div>
		</div>
	);
}
