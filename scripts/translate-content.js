#!/usr/bin/env node

/**
 * Insight Content Translation Script
 * 
 * Usage: node scripts/translate-content.js <source-file> <output-filename> [--source-lang zh]
 * 
 * Example: 
 *   node scripts/translate-content.js ~/Desktop/my-article.mdx welcome
 *   # This will create:
 *   # - content/insights/zh/welcome.mdx
 *   # - content/insights/en/welcome.mdx
 *   # - content/insights/ja/welcome.mdx
 *   # ... and all other languages
 * 
 * Requires: GEMINI_API_KEY environment variable
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Content output directory
const CONTENT_DIR = path.join(process.cwd(), 'content/insights');

// Supported languages
const LANGUAGES = {
	en: 'English',
	zh: 'Chinese (Simplified)',
	ja: 'Japanese',
	ko: 'Korean',
	fr: 'French',
	de: 'German',
	es: 'Spanish',
	pt: 'Portuguese (Brazilian)',
	ru: 'Russian',
	ar: 'Arabic',
	it: 'Italian',
};

// Gemini API endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function translateText(text, targetLang, apiKey) {
	const prompt = `Translate the following content to ${LANGUAGES[targetLang]}. 
Keep the Markdown/MDX formatting exactly as is (headers, lists, links, code blocks, etc.).
Only translate the text content, do not modify any code, URLs, or technical terms.
Do not add any explanations or notes, just output the translated content.

Content to translate:
${text}`;

	const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			contents: [{
				parts: [{ text: prompt }]
			}],
			generationConfig: {
				temperature: 0.3,
				maxOutputTokens: 8192,
			}
		}),
	});

	if (!response.ok) {
		throw new Error(`API request failed: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();
	return data.candidates[0].content.parts[0].text;
}

async function translateFrontmatter(frontmatter, targetLang, apiKey) {
	const fieldsToTranslate = ['title', 'description'];
	const translated = { ...frontmatter };

	for (const field of fieldsToTranslate) {
		if (frontmatter[field]) {
			translated[field] = await translateText(frontmatter[field], targetLang, apiKey);
			// Clean up any markdown artifacts
			translated[field] = translated[field].replace(/^["']|["']$/g, '').trim();
		}
	}

	// Translate tags if they exist
	if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
		const tagsText = frontmatter.tags.join('\n');
		const translatedTags = await translateText(tagsText, targetLang, apiKey);
		translated.tags = translatedTags.split('\n').map(t => t.trim()).filter(Boolean);
	}

	return translated;
}

async function main() {
	const args = process.argv.slice(2);

	if (args.length < 2) {
		console.log('📝 Insight Content Translation Script');
		console.log('');
		console.log('Usage: node scripts/translate-content.js <source-file> <output-filename> [--source-lang zh]');
		console.log('');
		console.log('Arguments:');
		console.log('  <source-file>      Path to the source MDX file (can be anywhere)');
		console.log('  <output-filename>  Output filename without extension (e.g., "welcome")');
		console.log('  --source-lang      Source language code (default: zh)');
		console.log('');
		console.log('Example:');
		console.log('  node scripts/translate-content.js ~/Desktop/my-article.mdx welcome');
		console.log('');
		console.log('This will create translated files in:');
		console.log('  content/insights/zh/welcome.mdx');
		console.log('  content/insights/en/welcome.mdx');
		console.log('  content/insights/ja/welcome.mdx');
		console.log('  ... (all 11 languages)');
		process.exit(1);
	}

	const sourceFile = args[0];
	const outputFilename = args[1].replace(/\.mdx?$/, '') + '.mdx'; // Ensure .mdx extension
	let sourceLang = 'zh'; // Default source language

	// Parse optional arguments
	const sourceLangIndex = args.indexOf('--source-lang');
	if (sourceLangIndex !== -1 && args[sourceLangIndex + 1]) {
		sourceLang = args[sourceLangIndex + 1];
	}

	// Check API key
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) {
		console.error('❌ Error: GEMINI_API_KEY environment variable is not set');
		console.error('   Please set it: export GEMINI_API_KEY=your_api_key');
		process.exit(1);
	}

	// Check if source file exists
	if (!fs.existsSync(sourceFile)) {
		console.error(`❌ Error: Source file not found: ${sourceFile}`);
		process.exit(1);
	}

	// Read and parse source file
	const sourceContent = fs.readFileSync(sourceFile, 'utf8');
	const { data: frontmatter, content } = matter(sourceContent);

	console.log('');
	console.log('📖 Source file:', sourceFile);
	console.log('📝 Title:', frontmatter.title || '(no title)');
	console.log('🌐 Source language:', sourceLang, `(${LANGUAGES[sourceLang]})`);
	console.log('� Output filename:', outputFilename);
	console.log('');

	// First, save the source language version
	const sourceLangDir = path.join(CONTENT_DIR, sourceLang);
	if (!fs.existsSync(sourceLangDir)) {
		fs.mkdirSync(sourceLangDir, { recursive: true });
	}
	const sourceOutputPath = path.join(sourceLangDir, outputFilename);
	fs.writeFileSync(sourceOutputPath, sourceContent);
	console.log(`✅ Saved source: ${sourceOutputPath}`);

	// Get target languages (all except source)
	const targetLangs = Object.keys(LANGUAGES).filter(lang => lang !== sourceLang);

	console.log('');
	console.log(`🔄 Translating to ${targetLangs.length} languages...`);
	console.log('');

	for (const targetLang of targetLangs) {
		try {
			process.stdout.write(`  → ${LANGUAGES[targetLang].padEnd(25)} `);

			// Translate frontmatter and content
			const translatedFrontmatter = await translateFrontmatter(frontmatter, targetLang, apiKey);
			const translatedContent = await translateText(content, targetLang, apiKey);

			// Create output directory if it doesn't exist
			const outputDir = path.join(CONTENT_DIR, targetLang);
			if (!fs.existsSync(outputDir)) {
				fs.mkdirSync(outputDir, { recursive: true });
			}

			// Compose final content with frontmatter
			const outputContent = matter.stringify(translatedContent, translatedFrontmatter);

			// Write to file
			const outputPath = path.join(outputDir, outputFilename);
			fs.writeFileSync(outputPath, outputContent);

			console.log(`✅ ${outputPath}`);

			// Add a small delay to avoid rate limiting
			await new Promise(resolve => setTimeout(resolve, 1500));

		} catch (error) {
			console.log(`❌ Failed: ${error.message}`);
		}
	}

	console.log('');
	console.log('✨ Translation complete!');
	console.log(`📁 Files saved to: ${CONTENT_DIR}/`);
}

main().catch(console.error);
