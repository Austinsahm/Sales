import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import React from "react";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
    downloadVerificationId: string;
    product: {
      name: string;
      description: string;
      imagePath: string;
    };
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product name",
        description: "Some Description",
        imagePath:
          "/products/86c22d36-8fe0-4502-bcce-452698af3acf-Asset 2@2x.png",
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 2000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product name 2",
        description: "Some Other Description",
        imagePath: "/products/6f91fe9c-1278-435d-ac36-babf0b4e6151-Logo.png",
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Download</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white"></Body>
        <Container className="max-w-xl">
          <Heading>Order History</Heading>
          {orders.map((order, index) => (
            <React.Fragment key={order.id}>
              <OrderInformation
                order={order}
                product={order.product}
                downloadVerificationId={order.downloadVerificationId}
              />
              {index !== orders.length - 1 && <Hr />}
            </React.Fragment>
          ))}
        </Container>
      </Tailwind>
    </Html>
  );
}
