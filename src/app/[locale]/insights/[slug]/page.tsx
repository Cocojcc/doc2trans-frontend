import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs } from "@/lib/insights";
import { getTranslations } from "next-intl/server";
import { Calendar, ArrowLeft, Tag, User } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

interface InsightPostProps {
	params: Promise<{
		locale: string;
		slug: string;
	}>;
}

export async function generateMetadata({ params }: InsightPostProps): Promise<Metadata> {
	const { slug, locale } = await params;
	const post = getPostBySlug(slug, locale);

	if (!post) {
		return { title: "Post Not Found" };
	}

	return {
		title: `${post.title} - Doc2Trans Insights`,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			publishedTime: post.date,
			authors: [post.author],
			tags: post.tags,
		},
	};
}

export async function generateStaticParams() {
	// Generate paths for both zh and en
	const zhSlugs = getAllPostSlugs("zh");
	const enSlugs = getAllPostSlugs("en");

	const paths: { locale: string; slug: string }[] = [];

	zhSlugs.forEach((slug) => paths.push({ locale: "zh", slug }));
	enSlugs.forEach((slug) => paths.push({ locale: "en", slug }));

	return paths;
}

export default async function InsightPost({ params }: InsightPostProps) {
	const { slug, locale } = await params;
	const t = await getTranslations("insights");
	const post = getPostBySlug(slug, locale);

	if (!post) {
		notFound();
	}

	return (
		<div className="min-h-screen flex flex-col">
			{/* Header */}
			<header className="w-full py-4 px-6 flex items-center justify-between border-b-2 border-foreground bg-background/80 backdrop-blur-sm sticky top-0 z-50">
				<Link href={`/${locale}`} className="flex items-center gap-3 rotate-slight-left hover:rotate-0 transition-transform">
					<div className="w-10 h-10 bg-primary border-2 border-foreground shadow-hard-sm wobbly-border-sm flex items-center justify-center">
						<span className="text-primary-foreground font-bold">D</span>
					</div>
					<h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">Doc2Trans</h1>
				</Link>
				<Link
					href={`/${locale}/insights`}
					className="flex items-center gap-2 font-body text-foreground hover:text-primary transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					{t("backToInsights")}
				</Link>
			</header>

			<main className="flex-1 container py-12 px-4">
				<article className="max-w-3xl mx-auto">
					{/* Article header */}
					<header className="mb-8">
						{/* Tags */}
						{post.tags.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-4">
								{post.tags.map((tag) => (
									<span
										key={tag}
										className="inline-flex items-center gap-1 px-3 py-1 text-sm font-body bg-muted border-2 border-foreground wobbly-border-sm"
									>
										<Tag className="w-3 h-3" />
										{tag}
									</span>
								))}
							</div>
						)}

						{/* Title */}
						<h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
							{post.title}
						</h1>

						{/* Meta */}
						<div className="flex flex-wrap items-center gap-4 text-muted-foreground font-body">
							<div className="flex items-center gap-2">
								<User className="w-4 h-4" />
								<span>{post.author}</span>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="w-4 h-4" />
								<span>{post.date}</span>
							</div>
						</div>
					</header>

					{/* Article content */}
					<div className="prose prose-lg dark:prose-invert max-w-none font-body prose-headings:font-heading prose-headings:rotate-slight-left prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
						<MDXRemote source={post.content} />
					</div>

					{/* Article footer */}
					<footer className="mt-12 pt-8 border-t-2 border-foreground">
						<Link
							href={`/${locale}/insights`}
							className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-heading border-2 border-foreground shadow-hard wobbly-border-sm hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
						>
							<ArrowLeft className="w-4 h-4" />
							{t("backToInsights")}
						</Link>
					</footer>
				</article>
			</main>

			{/* Footer */}
			<footer className="border-t-2 border-foreground py-6 px-4">
				<div className="container text-center">
					<p className="font-body text-sm text-muted-foreground">
						© {new Date().getFullYear()} Doc2Trans. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
