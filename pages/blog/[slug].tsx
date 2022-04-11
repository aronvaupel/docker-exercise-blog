import { GetStaticPaths, GetStaticProps } from 'next'
import fs from 'fs'
import matter from 'gray-matter'
import { MetaData } from '.'
import md from 'markdown-it'
import Head from 'next/head'
import { t } from 'i18next'

interface Props {
  frontMatter: MetaData
  content: string
}

export default function BlogPost({ frontMatter, content }: Props) {
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta http-equiv="Content-Type" content="text/html, charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="author" content={frontMatter.author} />
        <meta name="description" content={frontMatter.description} />
        <meta name="keywords" content={frontMatter.tags.join(' ')} />
      </Head>
      <div
        className="mx-auto prose"
        dangerouslySetInnerHTML={{ __html: md().render(content) }}
      />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const files = fs.readdirSync('_posts')
  const paths = files.map((fileName) => {
    return {
      params: {
        slug: fileName.replace('.md', ''),
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = (context) => {
  const slug = context.params?.slug
  const file = fs.readFileSync(`_posts/${slug}.md`, 'utf-8')
  const { data: frontMatter, content } = matter(file)
  return {
    props: {
      frontMatter,
      content,
    },
  }
}
