"use client"
import React, { useEffect } from 'react'

function SetMode({mode}:any) {
    useEffect(() => {
        localStorage.setItem('mode', mode)
    }, [])
    return (<></>);
}

export default SetMode