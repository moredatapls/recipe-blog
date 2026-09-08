import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getRecipes } from '../lib/recipes'

export default function Index({ recipes, title, description }) {
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('')
  const [tag, setTag] = useState('')

  const languages = useMemo(
    () => [...new Set(recipes.map(recipe => recipe.language).filter(Boolean))].sort(),
    [recipes]
  )
  const tags = useMemo(
    () =>
      [...new Set(recipes.reduce((allTags, recipe) => allTags.concat(recipe.tags || []), []))].sort(),
    [recipes]
  )
  const filteredRecipes = recipes.filter(recipe => {
    const recipeTags = recipe.tags || []
    const searchableText = [recipe.title, recipe.description, recipe.content, ...recipeTags]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return (
      searchableText.includes(query.toLowerCase()) &&
      (!language || recipe.language === language) &&
      (!tag || recipeTags.includes(tag))
    )
  })

  return (
    <Layout siteTitle={title} siteDescription={description}>
      <main>
        <div className="filters" role="search">
          <label>
            <span>Search</span>
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search recipes"
            />
          </label>
          <label>
            <span>Language</span>
            <select value={language} onChange={event => setLanguage(event.target.value)}>
              <option value="">All languages</option>
              {languages.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          {tags.length > 0 && (
            <label>
              <span>Tag</span>
              <select value={tag} onChange={event => setTag(event.target.value)}>
                <option value="">All tags</option>
                {tags.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          )}
        </div>
        <div className="recipe-grid">
        {filteredRecipes.map(recipe => (
          <Link key={recipe.slug} href={`/recipe/${recipe.slug}`}>
            <a className="recipe-card">
              <img src={recipe.image} alt="" />
              <div>
                <h2>{recipe.title}</h2>
                {recipe.description && <p>{recipe.description}</p>}
              </div>
            </a>
          </Link>
        ))}
        </div>
        {filteredRecipes.length === 0 && <p className="empty">No recipes found.</p>}
      </main>
      <style jsx>{`
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          max-width: 1100px;
          padding: 2rem 1.25rem 0;
          margin: 0 auto;
        }
        label {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          color: #666;
          font-size: 0.85rem;
        }
        input,
        select {
          min-width: 180px;
          border: 1px solid #ccc;
          border-radius: 0;
          padding: 0.65rem 0.7rem;
          font: inherit;
          background: #fff;
        }
        .recipe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          max-width: 1100px;
          padding: 2rem 1.25rem 4rem;
          margin: 0 auto;
        }
        .empty {
          max-width: 1100px;
          padding: 0 1.25rem 4rem;
          margin: 0 auto;
          color: #666;
        }
        .recipe-card img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          margin: 0 0 1rem;
        }
        .recipe-card h2 {
          margin-bottom: 0.4rem;
        }
        .recipe-card p {
          margin: 0;
          color: #666;
        }
        @media (min-width: 768px) {
          .recipe-grid {
            padding: 3rem 2rem 5rem;
          }
          .filters {
            padding: 3rem 2rem 0;
          }
          .empty {
            padding-right: 2rem;
            padding-left: 2rem;
          }
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps() {
  const config = require('../data/config.json')
  return {
    props: {
      recipes: getRecipes(),
      title: config.title,
      description: config.description,
    },
  }
}
