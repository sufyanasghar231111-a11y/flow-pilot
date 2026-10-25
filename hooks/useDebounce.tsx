"use client"

import { useEffect, useState } from "react"

export default function useDebounce(searchInput: string, delay: number) {

    const [debounce, setDebounce] = useState<string>(searchInput)


    useEffect(() => {

        const time = setTimeout(() => {
            setDebounce(searchInput)
        }, delay)

        return () => clearTimeout(time)
    }, [delay, searchInput])
    

    return debounce

}