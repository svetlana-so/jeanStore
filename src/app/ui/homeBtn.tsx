"use client"
import { useRouter } from 'next/navigation'
import React from 'react'


export default function HomeBtn({path} : {path: string}) {

const router = useRouter()
  return (
    <button onClick={() => router.push(path)} className="font-bold text-black dark:text-zinc-300
    m-4">
    &larr; HOME
  </button>
  )
}
