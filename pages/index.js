import Link from 'next/link'
import Layout from '../components/Layout'
import { getRecipes } from '../lib/recipes'

export default function Index({ recipes, title, description }) {
  return (
    <Layout siteTitle={title} siteDescription={description}>
      <main className="recipe-grid">
        {recipes.map(recipe => (
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
      </main>
      <style jsx>{`
        .recipe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          max-width: 1100px;
          padding: 2rem 1.25rem 4rem;
          margin: 0 auto;
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
