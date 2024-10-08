import Image from "next/image"
import Link from "next/link";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";
type Props = {
    id: number;
    name: string;
    price: number;
    count?: number;
    imageUrl: string;
    className?: string;
    ingredients?: Ingredient[]
}
//реакт use 2:10
export const ProductCard = ({ id, name, price, count, imageUrl, className, ingredients }: Props) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
                    <Image
                        src={imageUrl}
                        alt="Logo"
                        width={200} 
                        height={150} 
                    />
                </div>
                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

                <p className="text-sm text-gray-400">{ingredients?.map(item => item.name).join(', ')}</p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                        от <b>{price} ₽</b>
                    </span>
                    <Button variant={"secondary"}>
                        <Plus size={20} className="mr-1" />
                        Добавить
                    </Button>
                </div>

            </Link>
        </div>
    )
}