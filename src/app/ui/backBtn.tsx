"use client"
import { useRouter } from 'next/navigation'
import React from 'react'


export default function BackBtn({path}: {path: string}) {

const router = useRouter()
  return (
    <button onClick={() => router.push(path)} className="font-bold text-black dark:text-zinc-300 hover:text-orange-400 
    mb-8">
    &larr; Back
  </button>
  )
}
