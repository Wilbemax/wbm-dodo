'use client'
import Image from "next/image"
import { Container } from "./container"
import Logo from '@/public/logo.png'
import { Button } from "../ui"
import { User } from "lucide-react"
import { SearchInput } from "./search-input"
import Link from "next/link"
import { CartButton } from "./cart-button"
import { cn } from "@/lib/utils"
import { DirecButtonHeader } from "./direct-button-header"
import { signIn, useSession } from "next-auth/react"
import { useState } from "react"
import { AuthModal } from "./modal/auth-modal"
import { ProfileButton } from "./profile-button"
type Props = {
    hasSearch?: boolean,
    hasCart?: boolean,
    className?: string,
}

export const Header = ({ hasSearch = true, hasCart = true, className }: Props) => {
    const { data: session } = useSession()
    const [openAuthModal, setOpenAuthModal] = useState(false);

    console.log(session, 1111);

    return (
        <header className={cn("border-b border-gray-100", className)}>
            <Container className="flex items-center justify-between py-8">
                <Link href={'/'} className=" flex items-center gap-4">
                    <Image src={Logo} alt='Logo' width={35} height={35} />
                    <div>
                        <h1 className="text-2xl uppercase font-black">WBM</h1>
                        <p className="text-sm text-gray-400 leading-3">По пробуй новое</p>
                    </div>
                </Link>
                {hasSearch &&
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                }


                <div className="flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                    {hasCart ? <CartButton /> : <DirecButtonHeader />}
                </div>
            </Container>
        </header>
    )
}