import Image from "next/image"
import { Container } from "./container"
import Logo from '@/public/logo.png'
import { Button } from "../ui"
import { ArrowRight, ShoppingCart, User } from "lucide-react"
type Props = {}

export const Header = (props: Props) => {
    return (
        <header className="border-b border-gray-100">
            <Container className="flex items-center justify-between py-8">
                <div className=" flex items-center gap-4">
                    <Image src={Logo} alt='Logo' width={35} height={35} />
                    <div>
                        <h1 className="text-2xl uppercase font-black">WBM</h1>
                        <p className="text-sm text-gray-400 leading-3">По пробуй новое</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant={'outline'} className="flex items-center gap-3">
                        <User size={16} />
                        Войти
                    </Button>
                    <Button className="group relative">
                        <b>520 ₽</b>
                        <span className="h-full w-[1px] bg-white/30 mx-3" />
                        <div className="flex gap-1 items-center transition duration-30 group-hover:opacity-0">
                            <ShoppingCart className="relative" size={16} strokeWidth={2} />
                            <b>3</b>
                        </div>
                        <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"/>
                    </Button>
                </div>
            </Container>
        </header>
    )
}