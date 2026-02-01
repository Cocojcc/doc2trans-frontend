import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPostProps {
	params: {
		slug: string;
	};
}

// Mock data fetcher
async function getBlogPost(slug: string) {
	const posts: Record<string, { title: string; content: string; date: string }> = {
		"introducing-doclayout-translator": {
			title: "Introducing DocLayout Translator",
			content:
				"We are excited to launch DocLayout Translator. Traditional translation tools often mess up your document formatting. We solve this by...",
			date: "2024-01-15",
		},
		"best-practices-for-document-translation": {
			title: "Best Practices for Document Translation",
			content:
				"To get the best results, ensure your PDF or Word documents have clear headings and standard fonts...",
			date: "2024-01-20",
		},
	};

	return posts[slug] || null;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
	const post = await getBlogPost(params.slug);
	if (!post) return { title: "Post Not Found" };
	return {
		title: `${post.title} - DocLayout Translator`,
		description: post.content.substring(0, 160),
	};
}

export default async function BlogPost({ params }: BlogPostProps) {
	const post = await getBlogPost(params.slug);

	if (!post) {
		notFound();
	}

	return (
		<div className="container py-12 max-w-3xl">
			<Link href="/blog" className="text-primary hover:underline mb-8 inline-block">
				← Back to Blog
			</Link>
			<article className="prose dark:prose-invert lg:prose-xl">
				<h1 className="font-heading">{post.title}</h1>
				<div className="text-muted-foreground mb-8">{post.date}</div>
				<p>{post.content}</p>
			</article>
		</div>
	);
}
