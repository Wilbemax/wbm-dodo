import { Container, Title } from "@/components/shared"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

const Product = async ({ params: { id } }: { params: { id: string } }) => {

    const product = await prisma.product.findFirst({
        where: { id: Number(id) }
    })

    if (!product) {
        return notFound()
    }

    return (
        <Container>
            <Title text={product.name} />
        </Container>
    )
}
export default Product