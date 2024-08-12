import { Categories, Container, Filters, SortPopup, Title } from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { TopBar } from "@/components/shared/top-bar";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />

      </Container>
      <TopBar />
      <Container className="pb-14">
        <div className="flex gap-[60px]">
          <Filters />

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductCard id={0} name={"Мясная с аджикой"} price={769} imageUrl={"https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif"} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
