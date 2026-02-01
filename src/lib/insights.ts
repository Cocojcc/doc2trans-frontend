import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/insights");

export interface InsightPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	tags: string[];
	content: string;
}

export interface InsightPostMeta {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	tags: string[];
}

/**
 * Get all insight posts for a specific locale
 */
export function getAllPosts(locale: string = "en"): InsightPostMeta[] {
	const postsDirectory = path.join(contentDirectory, locale);

	// Check if directory exists
	if (!fs.existsSync(postsDirectory)) {
		return [];
	}

	const fileNames = fs.readdirSync(postsDirectory);
	const posts = fileNames
		.filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
		.map((fileName) => {
			const slug = fileName.replace(/\.mdx?$/, "");
			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");
			const { data } = matter(fileContents);

			return {
				slug,
				title: data.title || "",
				description: data.description || "",
				date: data.date || "",
				author: data.author || "",
				tags: data.tags || [],
			};
		});

	// Sort by date descending
	return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Get a single insight post by slug
 */
export function getPostBySlug(slug: string, locale: string = "en"): InsightPost | null {
	const postsDirectory = path.join(contentDirectory, locale);

	// Try .mdx first, then .md
	let fullPath = path.join(postsDirectory, `${slug}.mdx`);
	if (!fs.existsSync(fullPath)) {
		fullPath = path.join(postsDirectory, `${slug}.md`);
	}
	if (!fs.existsSync(fullPath)) {
		return null;
	}

	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return {
		slug,
		title: data.title || "",
		description: data.description || "",
		date: data.date || "",
		author: data.author || "",
		tags: data.tags || [],
		content,
	};
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs(locale: string = "en"): string[] {
	const postsDirectory = path.join(contentDirectory, locale);

	if (!fs.existsSync(postsDirectory)) {
		return [];
	}

	const fileNames = fs.readdirSync(postsDirectory);
	return fileNames
		.filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
		.map((fileName) => fileName.replace(/\.mdx?$/, ""));
}

/**
 * Get all locales that have insight content
 */
export function getAvailableLocales(): string[] {
	if (!fs.existsSync(contentDirectory)) {
		return [];
	}

	return fs.readdirSync(contentDirectory).filter((name) => {
		const fullPath = path.join(contentDirectory, name);
		return fs.statSync(fullPath).isDirectory();
	});
}
