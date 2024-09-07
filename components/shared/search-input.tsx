'use client'


import { Search } from 'lucide-react'
import { FC, useRef, useState } from 'react'
import { Input } from '../ui'
import { useClickAway, useDebounce } from 'react-use'
import { Api } from '@/services/api-routs'
import { Product } from '@prisma/client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'


type Props = {}

export const SearchInput: FC = (props: Props) => {
    const ref = useRef(null)
    const [focus, setFocus] = useState<boolean>(false)
    const [querySearch, setQuerySearch] = useState<string>('')
    const [products, setProducts] = useState<Product[]>([])

    useClickAway(ref, () => {
        setFocus(false)
    })


    useDebounce(async () => {
        try {
            const arr = await Api.products.search(querySearch)
            setProducts(arr)
        } catch (e) {
            console.error(e);
        }
    }, 250, [querySearch])

    const onClickItem = () => {
        setQuerySearch('')
        setFocus(false)
        setProducts([])
    }

    return (
        <>

            {focus && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30  " />}


            <div ref={ref} className='flex rounded-2xl flex-1 justify-between relative h-11 z-30'>
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
                <Input
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    placeholder="Найти что поесть..."
                    onFocus={() => setFocus(true)}
                    onChange={(e) => setQuerySearch(e.target.value)}
                />

            

            {products.length > 0 && <div
                className={cn(
                    'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                    focus && 'visible opacity-100 top-12',
                )}>

                {products.map((product, index) => (
                    <Link
                        onClick={onClickItem}
                        key={product.id}
                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                        href={`/product/${product.id}`}>
                        <Image className="rounded-sm h-8 w-8" src={product.imageUrl} alt={product.name} height={32} width={32} />
                        <span>{product.name}</span>
                    </Link>
                ))}

            </div>}
            </div>
        </>

    )
}