import { updateCartTotalAmount } from '@/lib/update-cart-total-amount'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    const data = (await req.json()) as { quantity: number }
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ message: 'Token not found' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ message: 'Cart item not found' })
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token)

    return NextResponse.json(updatedUserCart)
  } catch (e) {
    console.log('CATCH SERVER ERROR', e)

    return NextResponse.json(
      { message: 'Не удалось обновить корзину' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ message: 'Token not found' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ message: 'Cart item not found' })
    }

    await prisma.cartItem.delete({
      where: {
        id,
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token)

    return NextResponse.json(updatedUserCart)
  } catch (e) {
    console.log('CATCH SERVER ERROR', e)

    return NextResponse.json(
      { message: 'Не удалось обновить корзину' },
      { status: 500 }
    )
  }
}
