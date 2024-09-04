'use client'

import Link from "next/link"
import { Button } from "../ui"
import { useState } from "react"

type Props = {}

export const DirecButtonHeader = (props: Props) => {
    const [directing, setDirecting] = useState(false)
    const onRedirct =() => setDirecting(true)
    return (
        <Link href={'/'}><Button loading={directing} onClick={onRedirct}>На главную</Button></Link>
    )
}