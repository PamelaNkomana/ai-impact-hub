<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All AI calls go through the single `runAI` server function in src/lib/ai.functions.ts, with one system prompt per feature, so prompts and safety rules live in one place.
- Colors come only from the semantic tokens in src/styles.css: `--primary` fills with dark `--primary-foreground` text, `--primary-deep` for text/links/icons on light surfaces, and the `silver-plate`/`bg-hero` utilities for the silver streak texture — so the theme stays readable and re-themable.
