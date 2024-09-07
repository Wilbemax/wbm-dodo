

import { Categories, Container, Filters, ProductsGroupList, SortPopup, Title } from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { TopBar } from "@/components/shared/top-bar";
import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";

export default async function Home({searchParams} : {searchParams: GetSearchParams}) {

  const categories = await findPizzas(searchParams)
  


  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />

      </Container>
      <TopBar category={categories.filter((category) => category.products.length > 0)} />
      <Container className="pb-14">
        <div className="flex gap-[60px] mt-10">
          <Suspense>
            <Filters />
          </Suspense>
          

          <div className="flex-1">
            <div className="flex flex-col gap-16 ">
              {categories.map((category) => (
                category.products.length > 0 && (
                  < ProductsGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    products={category.products}
                  />
                )
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
