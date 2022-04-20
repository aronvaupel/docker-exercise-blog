import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import fs from 'fs'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageButton from '../../components/LanguageButton'
import Head from 'next/head'

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetch('http://localhost:8000/feed').then((res) =>
    res.json()
  )
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
    id: number
    createdAt: string
    title: string
    author: {
      id: number
      name: string
      email: string
    }
  }[]
}

const Blog = ({ fileArray }: Props) => {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  // const filterFunction = (post: typeof fileArray[0]) => {
  //   if (!query) {
  //     return true
  //   }
  //   return (
  //     post.tags
  //       .map((tag) => tag.toLowerCase())
  //       .includes(query.toLowerCase()) ||
  //     post.author.name.toLowerCase().includes(query.toLowerCase())
  //   )
  // }

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
            className="my-8 h-6 w-full border border-slate-800 p-4"
            type="search"
            onChange={(event) => setQuery(event.target.value)} // in larger project use "debouncing", which will delay the search execution
          />
        </div>

        {fileArray.map((singlePost) => (
          <Link href={`/blog/${singlePost.id}`}>
            <a>
              <div>
                <header>
                  <h1>{singlePost.title}</h1>
                </header>

                <div>
                  <p>by:{singlePost.author.name}</p>
                  <p>created:{singlePost.createdAt}</p>
                </div>
                {/* <img src={`${singlePost.image}`} alt="an image" /> */}
              </div>
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Blog
