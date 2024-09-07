'use server'

import { prisma } from '@/prisma/prisma-client'
// import { PayOrderTemplate } from '@/shared/components';
// import { VerificationUserTemplate } from '@/shared/components/shared/email-temapltes/verification-user';
import { TCheckoutSchema } from '@/components/shared/checkout/checkout-schema'
// import { createPayment, sendEmail } from '@//lib';
// import { getUserSession } from '@/lib/get-user-session';
import { OrderStatus, Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { cookies } from 'next/headers'
import { getUserSession } from '@/lib/get-user-session'

export async function createOrder(data: TCheckoutSchema) {
  try {
    const cookieStore = cookies()
    const cartToken = cookieStore.get('cartToken')?.value

    if (!cartToken) {
      throw new Error('Cart token not found')
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    })

    /* Если корзина не найдена возращаем ошибку */
    if (!userCart) {
      throw new Error('Cart not found')
    }

    /* Если корзина пустая возращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty')
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    })

    /* Очищаем корзину */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    })

    return order
  } catch (err) {
    console.log('[CreateOrder] Server error', err)
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.vereficationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    // await sendEmail(
    //   createdUser.email,
    //   'Next Pizza / 📝 Подтверждение регистрации',
    //   VerificationUserTemplate({
    //     code,
    //   }),
    // );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}
