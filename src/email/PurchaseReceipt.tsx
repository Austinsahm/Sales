import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    description: string;
    imagePath: string;
  };
  order: { id: string; createdAt: Date; pricePaidInCents: number };
  downlodVerificetionId: string;
};

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Product name",
    description: "Some Description",
    imagePath: "/products/86c22d36-8fe0-4502-bcce-452698af3acf-Asset 2@2x.png",
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
  downlodVerificetionId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downlodVerificetionId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white"></Body>
        <Container className="max-w-xl">
          <Heading>Purchase Receipt</Heading>
          <OrderInformation
            order={order}
            product={product}
            downloadVerificationId={downlodVerificetionId}
          />
        </Container>
      </Tailwind>
    </Html>
  );
}
