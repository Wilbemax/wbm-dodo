import Image from "next/image"
import { Container } from "./container"
import Logo from '@/public/logo.png'
import { Button } from "../ui"
import { ArrowRight, ShoppingCart, User } from "lucide-react"
import { SearchInput } from "./search-input"
import Link from "next/link"
import { CartButton } from "./cart-button"
type Props = {}

export const Header = (props: Props) => {
    return (
        <header className="border-b border-gray-100">
            <Container className="flex items-center justify-between py-8">
                <Link href={'/'} className=" flex items-center gap-4">
                    <Image src={Logo} alt='Logo' width={35} height={35} />
                    <div>
                        <h1 className="text-2xl uppercase font-black">WBM</h1>
                        <p className="text-sm text-gray-400 leading-3">По пробуй новое</p>
                    </div>
                </Link>

                <div className="mx-10 flex-1">
                    <SearchInput />
                </div>

                <div className="flex items-center gap-3">
                    <Button variant={'outline'} className="flex items-center gap-3">
                        <User size={16} />
                        Войти
                    </Button>
                    <CartButton />
                </div>
            </Container>
        </header>
    )
}