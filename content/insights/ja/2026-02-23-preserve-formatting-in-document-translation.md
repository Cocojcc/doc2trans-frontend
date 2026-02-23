---
title: "PDF/Wordを翻訳してもレイアウト崩れしない方法：表・図・用語集の一貫性まで"
description: "PDF/Word翻訳でレイアウトや表を保ちながら、用語集で訳語の一貫性も担保する実践ワークフロー（Doc2Trans）。"
date: "2026-02-23"
author: "Doc2Trans Team"
tags: ["ドキュメント翻訳", "レイアウト保持", "用語集"]
lang: "ja"
---

## なぜ翻訳でレイアウトが崩れるのか

When you translate a document, the *text length changes* (sometimes 30–200%). That alone can break line wraps, table widths, and page spacing. If the workflow is “extract text → translate → paste back”, you also lose **structure signals** (headings, lists, table cells) that layout engines rely on.

**SEO keywords:** PDF 翻訳 レイアウト保持, Word 翻訳 書式維持, 用語集 一貫性

## よくある課題

- **Tables drift**: cell heights expand and borders overlap.
- **Fonts and spacing change**: line-height and kerning differences create reflow.
- **Mixed content**: charts, screenshots, and scanned pages require OCR.
- **Terminology inconsistency**: the same product term gets translated multiple ways.
- **Output mismatch**: you get a translated text file, but not a ready-to-publish PDF/Word.

## Doc2Transで構造とレイアウトを維持する

Doc2Trans is built for “document translation with layout preservation”. Instead of treating files as plain text, it keeps **layout + structure + terminology** in the same pipeline, so the exported file stays close to the original.

## 主な機能

- **Layout retention**: keep pages, margins, and typography as stable as possible.
- **Structure-aware translation**: headings, lists, table cells, and captions stay in place.
- **Glossary consistency**: enforce preferred translations for key terms across the document.
- **Tables & charts support**: translate inside table cells; keep grids and alignment.
- **Scanned PDF support**: OCR-first flow so image-based documents become editable.

## 仕組み（ワークフロー）

1. **Upload** your PDF/Word (scanned PDFs supported).
2. **Extract structure** (blocks, tables, reading order) + run OCR when needed.
3. **Apply glossary** (your terms first, then machine translation suggestions).
4. **Translate** while preserving block boundaries (so layout doesn’t collapse).
5. **Export** back to the original format (PDF/Word), ready for delivery.

## 簡易QAチェックリスト

- Check 3–5 representative pages (dense tables + image-heavy pages).
- Spot-check glossary terms (brand names, features, UI strings).
- Verify table headers and footnotes didn’t shift to wrong pages.
- Ensure line breaks in lists are readable (no broken bullets).

## Doc2Transを試す

If you’re translating business documents (not just “for reference”), try Doc2Trans to keep **formatting, structure, and terminology** consistent from draft to export.

### Sources

- https://redokun.com/blog/how-to-translate-document-and-preserve-the-layout
- https://www.pairaphrase.com/blog/best-way-to-translate-a-scanned-document-pdf
