import Layout from '../components/Layout'
import BlogList from '../components/BlogList'

const Index = props => {
  return (
    <Layout
      pathname="/"
      siteTitle={props.title}
      siteDescription={props.description}
    >
      <section>
        <BlogList recipes={props.recipes} />
      </section>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const siteConfig = await import(`../data/config.json`)

  // Get posts & context from folder
  const recipes = (context => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) =>  {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')

      return {
        content: values[index],
        slug
      }
    })

    return data
  })(require.context('../recipes', true, /\.json$/))

  return {
    props: {
      recipes: recipes,
      title: siteConfig.default.title,
      description: siteConfig.default.description,
    }
  }
}
