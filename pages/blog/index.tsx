import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import fs from 'fs'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageButton from '../../components/LanguageButton'
import Head from 'next/head'

export const getStaticProps: GetStaticProps = () => {
  // once per page, (bc no two functions can have the same name :-) )
  const fileArray = fs.readdirSync('_posts') // readdirSync creates an array of filenames
  const posts = fileArray.map((singleFileName) => {
    const slug = singleFileName.replace('.md', '') // cut out file extensions
    const post = fs.readFileSync(`_posts/${singleFileName}`, 'utf-8') // bc we map here, we can save the file contents in 'post' since we need to access the yaml metadata
    const { data: metadata } = matter(post) //parses md and extract 'data' from the 'YAML- part' of the file which is called front matter in md
    return {
      slug: slug,
      metadata: metadata, // can be shortend, bc key and value are the same
    }
  })
  return {
    props: {
      fileArray: posts,
    },
  }
}

export interface MetaData {
  title: string
  author: string
  date: string
  image: string
  tags: string[]
  description: string
}

interface Props {
  fileArray: {
    slug: string
    metadata: MetaData
  }[]
}

const Blog = ({ fileArray }: Props) => {
  const { t } = useTranslation()
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
    <>
      <Head>
        <title>Blog</title>
        <meta http-equiv="Content-Type" content="text/html, charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Aron" content="Overview and links to blog posts" />
        <meta name="description" content="Blog links" />
        <meta name="keywords" content={t('home:head.keywords')} />
      </Head>
      <div className="p-8">
        <LanguageButton />
        <section className="w-full">
          <h1>{t('test:header')}</h1>
          <p>{t('test:text')}</p>
        </section>

        <div>
          <input
            className="w-full h-6 border border-slate-800 p-4 my-8"
            type="search"
            onChange={(event) => setQuery(event.target.value)} // in larger project use "debouncing", which will delay the search execution
          />
        </div>

        {fileArray.filter(filterFunction).map((singlePost) => (
          <Link href={`/blog/${singlePost.slug}`}>
            <a>
              <div>
                <header>
                  <h1>{singlePost.metadata.title}</h1>
                </header>

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
    </>
  )
}

export default Blog
