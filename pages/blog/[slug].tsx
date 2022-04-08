import { GetStaticPaths, GetStaticProps } from 'next'
import fs from 'fs'
import matter from 'gray-matter'
import { MetaData } from '.'
import md from 'markdown-it'

interface Props {
  frontMatter: MetaData
  content: string
}

export default function BlogPost({ frontMatter, content }: Props) {
  return (
    <div
      className="mx-auto prose"
      dangerouslySetInnerHTML={{ __html: md().render(content) }}
    />
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
