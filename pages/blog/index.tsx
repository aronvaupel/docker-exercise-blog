import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import fs from 'fs'
import Link from 'next/link'
import { useState } from 'react'

export const getStaticProps: GetStaticProps = () => {
  const fileArray = fs.readdirSync('_posts')
  const posts = fileArray.map((singleFileName) => {
    const slug = singleFileName.replace('.md', '')
    const post = fs.readFileSync(`_posts/${singleFileName}`, 'utf-8')
    const { data: metadata } = matter(post)
    return {
      slug,
      metadata,
    }
  })
  return {
    props: {
      fileArray: posts,
    },
  }
}

type MetaData = {
  title: string
  author: string
  date: string
  image: string
  tags: string[]
}

type Props = {
  fileArray: {
    slug: string
    metadata: MetaData
  }[]
}

const Blog = ({ fileArray }: Props) => {
  const [query, setQuery] = useState('')

  const filterFunction = (post: typeof fileArray[0]) => {
    if (!query) {
      return true
    }
    return (
      post.metadata.tags
        .map((tag) => tag.toLowerCase())
        .includes(query.toLowerCase()) ||
      post.metadata.author.toLowerCase().includes(query.toLowerCase())
    )
  }

  return (
    <div className="p-8">
      <div>
        <input
          className="w-full h-6 border border-slate-800 p-4"
          type="search"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {fileArray.filter(filterFunction).map((singlePost) => (
        <Link href={`/blog/${singlePost.slug}`}>
          <a>
            <div>
              <h2>{singlePost.metadata.title}</h2>
              <div>
                <p>by:{singlePost.metadata.author}</p>
                <p>created:{singlePost.metadata.date}</p>
              </div>
              <img src={`${singlePost.metadata.image}`} alt="an image" />
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Blog
