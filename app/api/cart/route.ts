import { findOrCreateCart } from '@/lib/find-or-create-cart'
import { updateCartTotalAmount } from '@/lib/update-cart-total-amount'
import { prisma } from '@/prisma/prisma-client'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] })
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token: token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    })

    return NextResponse.json(userCart)
  } catch (e) {
    return NextResponse.json(
      { message: 'Не удалось создать корзину' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value

    if (!token) {
      token = crypto.randomUUID().toString()
    }

    const userCart = await findOrCreateCart(token)

    const data = (await req.json()) as CreateCartItemValues

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: { every: { id: { in: data.ingredients } } },
      },
    })

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      })
    }

    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        quantity: 1,
        ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token)
    const resp = NextResponse.json(updatedUserCart)
    resp.cookies.set('cartToken', token)
    return resp
  } catch (e) {
    console.log('[POST_SERVER] Error')
    return NextResponse.json(
      { message: 'Не удалось создать корзину' },
      { status: 500 }
    )
  }
}
