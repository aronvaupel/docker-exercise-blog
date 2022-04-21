import { GetStaticPaths, GetStaticProps } from 'next'
import fs from 'fs'
import matter from 'gray-matter'
import md from 'markdown-it'
import Head from 'next/head'
import { t } from 'i18next'
import { Post } from '.'

interface Props {
  post: Post
}

export default function BlogPost({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta http-equiv="Content-Type" content="text/html, charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="keywords" content={post.tags.join(' ')} />
      </Head>
      <div
        className="prose mx-auto"
        dangerouslySetInnerHTML={{ __html: md().render(post.content) }}
      />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let posts: Post[] = await fetch('http://localhost:8000/feed').then((res) =>
    res.json()
  )
  const paths = posts.map((post) => {
    return {
      params: {
        id: post.id.toString(),
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const post = await fetch(`http://localhost:8000/post/${id}`).then((res) =>
    res.json()
  )

  return {
    props: {
      post,
    },
  }
}
