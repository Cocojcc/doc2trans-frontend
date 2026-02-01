"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { Button } from "../ui/button";

interface InsightPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
}

interface InsightsPreviewProps {
	posts: InsightPost[];
	locale: string;
}

const InsightsPreview = ({ posts, locale }: InsightsPreviewProps) => {
	const t = useTranslations("insights");

	if (posts.length === 0) {
		return null;
	}

	// Show only first 3 posts
	const displayPosts = posts.slice(0, 3);

	return (
		<section className="py-16 md:py-24 px-4 bg-muted/30">
			<div className="container">
				{/* Section header */}
				<div className="text-center mb-12">
					<h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 rotate-slight-left inline-block">
						{t("title")}
					</h2>
					<p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
						{t("subtitle")}
					</p>
				</div>

				{/* Posts grid */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-8">
					{displayPosts.map((post, index) => (
						<Link
							key={post.slug}
							href={`/${locale}/insights/${post.slug}`}
							className={`group block p-6 bg-background border-2 border-foreground shadow-hard wobbly-border hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${index % 2 === 0 ? "rotate-slight-left" : "rotate-slight-right"
								} hover:rotate-0`}
						>
							{/* Tags */}
							{post.tags.length > 0 && (
								<div className="flex flex-wrap gap-2 mb-3">
									{post.tags.slice(0, 2).map((tag) => (
										<span
											key={tag}
											className="inline-flex items-center gap-1 px-2 py-1 text-xs font-body bg-muted border border-foreground wobbly-border-sm"
										>
											<Tag className="w-3 h-3" />
											{tag}
										</span>
									))}
								</div>
							)}

							{/* Title */}
							<h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">
								{post.title}
							</h3>

							{/* Description */}
							<p className="font-body text-muted-foreground mb-4 line-clamp-2">
								{post.description}
							</p>

							{/* Footer */}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
									<Calendar className="w-4 h-4" />
									<span>{post.date}</span>
								</div>
								<span className="flex items-center gap-1 text-primary font-body text-sm group-hover:gap-2 transition-all">
									{t("readMore")}
									<ArrowRight className="w-4 h-4" />
								</span>
							</div>
						</Link>
					))}
				</div>

				{/* View more button */}
				<div className="text-center">
					<Link href={`/${locale}/insights`}>
						<Button
							variant="outline"
							size="lg"
							className="font-heading border-2 border-foreground shadow-hard wobbly-border-sm hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all gap-2"
						>
							{t("viewAll")}
							<ArrowRight className="w-4 h-4" />
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default InsightsPreview;
