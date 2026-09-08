import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const recipesDirectory = path.join(process.cwd(), 'recipes')

export function getRecipes() {
  return fs
    .readdirSync(recipesDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.md$/, '')
      const source = fs.readFileSync(path.join(recipesDirectory, file), 'utf8')
      const { data, content } = matter(source)

      return {
        slug,
        content,
        ...data,
        date: data.date ? new Date(data.date).toISOString() : null,
      }
    })
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
}

export function getRecipe(slug) {
  return getRecipes().find(recipe => recipe.slug === slug)
}
