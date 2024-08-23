import { Categories, Container, Filters, ProductsGroupList, SortPopup, Title } from "@/components/shared";
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
              <ProductsGroupList title={"Пиццы"} products={
                [{
                  id: 1,
                  name: 'Пепперони фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                  price: 550,
                  items:
                    [
                      {
                        price: 550
                      }
                    ]
                }, {
                  id: 2,
                  name: 'Пепперони фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                  price: 550,
                  items:
                    [
                      {
                        price: 550
                      }
                    ]
                },{
                  id: 3,
                  name: 'Пепперони фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                  price: 550,
                  items:
                    [
                      {
                        price: 550
                      }
                    ]
                },{
                  id: 4,
                  name: 'Пепперони фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                  price: 550,
                  items:
                    [
                      {
                        price: 550
                      }
                    ]
                },{
                  id: 5,
                  name: 'Пепперони фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                  price: 550,
                  items:
                    [
                      {
                        price: 550
                      }
                    ]
                },]} categoryId={1} />
               <ProductsGroupList title={"Завтраки"} products={
                [{
                  id: 1,
                  name: 'Пепперони фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                  price: 550,
                  items:
                    [
                      {
                        price: 550
                      }
                    ]
                }, {
                  id: 2,
                  name: 'Пепперони фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                  price: 550,
                  items:
                    [
                      {
                        price: 550
                      }
                    ]
                },{
                  id: 3,
                  name: 'Пепперони фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                  price: 550,
                  items:
                    [
                      {
                        price: 550
                      }
                    ]
                },{
                  id: 4,
                  name: 'Пепперони фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                  price: 550,
                  items:
                    [
                      {
                        price: 550
                      }
                    ]
                },{
                  id: 5,
                  name: 'Пепперони фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                  price: 550,
                  items:
                    [
                      {
                        price: 550
                      }
                    ]
                },]} categoryId={2} />  
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
