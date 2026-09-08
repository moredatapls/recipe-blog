# stupidly simple vegan

A small, minimalist recipe blog built with Next.js. Recipes are written in
Markdown and generated as static pages, so the site can be hosted on GitHub
Pages.

## Local development

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The development server
reloads when pages, components, or recipes change.

To create a production build locally:

```sh
npm run build
```

The legacy OpenSSL option is needed because this project uses an older
Next.js/Webpack version. `npm run export` creates the static site in `out/`:

```sh
npm run export
```

## Adding a recipe

1. Add an image to `public/static/`.
2. Create a Markdown file in `recipes/`. The filename becomes the URL slug:
   `recipes/chocolate-cake.md` becomes `/recipe/chocolate-cake/`.
3. Add frontmatter at the top of the file:

   ```md
   ---
   title: Chocolate cake
   description: A simple chocolate cake.
   image: /static/chocolate-cake.jpg
   image_alt: Chocolate cake on a plate
   date: 2026-09-08
   language: en
   ---
   ```

4. Write the recipe below the frontmatter. Use Markdown headings and lists,
   for example:

   ```md
   ## Ingredients

   - 200 g flour
   - 100 g sugar

   ## Instructions

   1. Mix the ingredients.
   2. Bake until done.
   ```

The recipe automatically appears on the home page and gets its own static
page during the next build. Keep image paths rooted at `/static/` so they work
both locally and on the exported site.

Use an ISO 639-1 language code such as `en` or `de` in the `language`
frontmatter field.

The older JSON recipes in `recipes/` are retained as a possible future source
for structured calculations. They are not currently displayed; Markdown files
are the active recipe format.

The exported site is configured for the custom domain
`stupidlysimplevegan.org` via `public/CNAME`.

## Project structure

| Path | Purpose |
| --- | --- |
| `recipes/*.md` | Active recipe content |
| `public/static/` | Recipe images and other static assets |
| `pages/` | Home, info, and recipe page routes |
| `lib/recipes.js` | Markdown loading and recipe discovery |
| `data/config.json` | Site title and description |
| `out/` | Generated static site, ignored by Git |
