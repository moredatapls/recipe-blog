import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import { getRecipe, getRecipes } from '../../lib/recipes'

export default function Recipe({ recipe, siteTitle, siteDescription }) {
  return (
    <Layout siteTitle={`${recipe.title} — ${siteTitle}`} siteDescription={siteDescription}>
      <article className="recipe">
        <img className="recipe-image" src={recipe.image} alt={recipe.image_alt || recipe.title} />
        <div className="recipe-content">
          <Link href="/"><a className="back">← all recipes</a></Link>
          <h1>{recipe.title}</h1>
          {recipe.description && <p className="description">{recipe.description}</p>}
          <ReactMarkdown source={recipe.content} />
        </div>
      </article>
      <style jsx>{`
        .recipe-image {
          display: block;
          width: 100%;
          max-height: 58vh;
          object-fit: cover;
          margin: 0;
        }
        .recipe-content {
          max-width: 720px;
          padding: 2rem 1.25rem 4rem;
          margin: 0 auto;
        }
        .back {
          display: inline-block;
          margin-bottom: 2rem;
          color: #666;
        }
        h1 {
          margin-bottom: 0.5rem;
        }
        .description {
          color: #666;
          margin-bottom: 2.5rem;
        }
        :global(.recipe-content h2) {
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }
        :global(.recipe-content ul),
        :global(.recipe-content ol) {
          padding-left: 1.4rem;
        }
        :global(.recipe-content li) {
          padding-left: 0.3rem;
          margin-bottom: 0.7rem;
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const config = require('../../data/config.json')
  return { props: { recipe: getRecipe(params.slug), siteTitle: config.title, siteDescription: config.description } }
}

export async function getStaticPaths() {
  return { paths: getRecipes().map(recipe => ({ params: { slug: recipe.slug } })), fallback: false }
}
