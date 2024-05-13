"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

function Redirect({ route }: any) {
    const router = useRouter();
    router.push(route);
    return (
        <div></div>
    )
}

export default Redirect