import * as React from 'react'
const glob = require('glob')

import Layout from '../../components/Layout'

export default function BlogTemplate({ content, slug, config }) {
  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  return (
    <Layout siteTitle={content.title}>
      <article className="blog">
        <figure className="blog__hero">
          <img
            src={content.hero_image}
            alt={`${content.title}`}
          />
        </figure>
        <div className="blog__info">
          <h1>{content.title}</h1>
          <h3>
            {reformatDate(content.date)}
            &nbsp;—&nbsp;
            {content.authors.join(", ")}
          </h3>
        </div>
        <div className="blog__ingredients">
          <h2>Ingredients</h2>
          <ol className="list">
            {content.ingredients.length >= 1 &&
            content.ingredients.map(ingredient => (
              <a>
                <li>
                    {ingredient.quantity && ingredient.quantity + " "}{ingredient.unit && " " + ingredient.unit}{ingredient.quantity > 1 ? "s " : ""}{ingredient.quantity && ingredient.unit && " of "}<b>{ingredient.name}</b>
                </li>
              </a>
            ))}
          </ol>
        </div>
        <div className="blog__instructions">
          <h2>Instructions</h2>
          <ul className="list">
            {content.steps.length >= 1 &&
              content.steps.map(steps => (
                <a>
                  <li>
                    {steps.text}
                  </li>
                </a>
              ))}
          </ul>
        </div>
      </article>
      <style jsx>
        {`
          .blog h1 {
            margin-bottom: 0.7rem;
          }

          .blog__hero {
            min-height: 300px;
            height: 60vh;
            width: 100%;
            margin: 0;
            overflow: hidden;
          }
          .blog__hero img {
            margin-bottom: 0;
            object-fit: cover;
            min-height: 100%;
            min-width: 100%;
            object-position: center;
          }

          .blog__info {
            padding: 1.5rem 1.25rem;
            width: 100%;
            max-width: 768px;
            margin: 0 auto;
          }
          .blog__info h1 {
            margin-bottom: 0.66rem;
          }
          .blog__info h3 {
            margin-bottom: 0;
          }

          .blog__ingredients {
            width: 100%;
            padding: 0 1.25rem;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .blog__ingredients a {
            padding-bottom: 1.5rem;
          }
          .blog__ingredients:last-child {
            margin-bottom: 0;
          }
          .blog__ingredients h1 h2 h3 h4 h5 h6 p {
            font-weight: normal;
          }
          .blog__ingredients p {
            color: inherit;
          }
          .blog__ingredients ul {
            list-style: initial;
          }
          .blog__ingredients ul ol {
            margin-left: 1.25rem;
            margin-bottom: 1.25rem;
            padding-left: 1.45rem;
          }
          
          .blog__instructions {
            width: 100%;
            padding: 0 1.25rem;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .blog__instructions a {
            padding-bottom: 1.5rem;
          }
          .blog__instructions:last-child {
            margin-bottom: 0;
          }
          .blog__instructions h1 h2 h3 h4 h5 h6 p {
            font-weight: normal;
          }
          .blog__instructions p {
            color: inherit;
          }
          .blog__instructions ul {
            list-style-image: initial;
            list-style-type: initial;
          }
          .blog__instructions ul ol {
            margin-left: 1.25rem;
            margin-bottom: 1.25rem;
            padding-left: 1.45rem;
          }

          .blog__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 1.25rem;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
          }
          .blog__footer h2 {
            margin-bottom: 0;
          }
          .blog__footer a {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .blog__footer a svg {
            width: 20px;
          }

          @media (min-width: 768px) {
            .blog {
              display: flex;
              flex-direction: column;
            }
            .blog__body {
              max-width: 800px;
              padding: 0 2rem;
            }
            .blog__body span {
              width: 100%;
              margin: 1.5rem auto;
            }
            .blog__body ul ol {
              margin-left: 1.5rem;
              margin-bottom: 1.5rem;
            }
            .blog__hero {
              min-height: 600px;
              height: 75vh;
            }
            .blog__info {
              text-align: center;
              padding: 2rem 0;
            }
            .blog__info h1 {
              max-width: 500px;
              margin: 0 auto 0.66rem auto;
            }
            .blog__footer {
              padding: 2.25rem;
            }
          }

          @media (min-width: 1440px) {
            .blog__hero {
              height: 70vh;
            }
            .blog__info {
              padding: 3rem 0;
            }
            .blog__footer {
              padding: 2rem 2rem 3rem 2rem;
            }
          }
        `}
      </style>
    </Layout>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params

  const content = await require(`../../recipes/${slug}.json`)
  const config = await require(`../../data/config.json`)

  return {
    props: {
      content,
      slug,
      config
    }
  }
}

export async function getStaticPaths() {
  const recipes = glob.sync('recipes/**/*.json')

  //remove path and extension to leave filename only
  const recipeSlugs = recipes.map(file =>
    file
      .split('/')[1]
      .replace(/ /g, '-')
      .split('.')[0]
      .trim()
  )

  // create paths with `slug` param
  const paths = recipeSlugs.map(slug => `/recipe/${slug}`)
  return {
    paths,
    fallback: false
  }
}
