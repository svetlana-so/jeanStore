"use client"
import { useRouter } from 'next/navigation'
import React from 'react'


export default function HomeBtn({path}: {path: string}) {

const router = useRouter()
  return (
    <button onClick={() => router.push(path)} className="font-bold text-black hover:text-orange-400 dark:text-zinc-300
    mb-8">
    &larr; Back
  </button>
  )
}
