import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
      <div>
        <h2>Hello</h2>  

        <ProductCard
            rating={4}
            image={""}
            text={"HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello"}
            price={"400 ₽"}
            reviews={4242}
            oldPrice={"1500 ₽"}
            promoLabels={"Хит продаж"}
            discount={"45%"}
            comments={45}
            quality={"Хорошее"}
        />
      </div>
  )
}


