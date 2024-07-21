"use client"
import { useRouter } from 'next/navigation'
import React from 'react'


export default function HomeBtn() {

const router = useRouter()
  return (
    <button onClick={() => router.push('/')} className="font-bold text-black
    m-4">
    &larr; HOME
  </button>
  )
}
