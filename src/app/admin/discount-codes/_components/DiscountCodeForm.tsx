"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { DiscountCodeType, Product } from "@prisma/client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { addDiscountCode } from "../../_actions/discountCodes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export function DiscountCodeForm({
  products,
}: {
  products: { name: string; id: string }[];
}) {
  const [error, action] = useFormState(addDiscountCode, {});
  const [allProducts, setAllProducts] = useState(true);

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="code">Code</label>
        <Input type="text" id="code" name="code" required />
        {error.code && <div className="text-destructive">{error.code}</div>}
      </div>

      <div className="space-y-2 gap-8 flex items-baseline">
        <div className="space-y-2">
          <label htmlFor="discountType">Discount Type</label>
          <RadioGroup
            id="discountType"
            name="discountType"
            defaultValue={DiscountCodeType.PERCENTAGE}
          >
            <div className="flex gap-2 items-center">
              <RadioGroupItem
                id="pencentage"
                value={DiscountCodeType.PERCENTAGE}
              />
              <Label htmlFor="percentage">Percentage</Label>
            </div>
            <div className="flex gap-2 items-center">
              <RadioGroupItem id="fixed" value={DiscountCodeType.FIXED} />
              <Label htmlFor="fixed">Fixed</Label>
            </div>
          </RadioGroup>
          {error.discountType && (
            <div className="text-destructive">{error.discountType}</div>
          )}
        </div>
        <div className="space-y-2 flex-grow">
          <label htmlFor="discountAmount">Discount Amount</label>
          <Input
            type="number"
            id="discountAmount"
            name="discountAmount"
            required
          />
          {error.discountAmount && (
            <div className="text-destructive">{error.discountAmount}</div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="limit">Limit</label>
        <Input type="number" id="limit" name="limi" />
        <div className="text-muted-foreground">
          Leave blank for infinite uses
        </div>
        {error.limit && <div className="text-destructive">{error.limit}</div>}
      </div>
      <div className="space-y-2">
        <label htmlFor="expiresAt">Expiration</label>
        <Input
          type="datetime-local"
          id="limit"
          name="limi"
          className="w-max"
          min={new Date().toJSON().split(":").slice(0, -1).join(":")}
        />
        <div className="text-muted-foreground">
          Leave blank for no expiration
        </div>
        {error.expiresAt && (
          <div className="text-destructive">{error.expiresAt}</div>
        )}
      </div>

      <div className="space-y-2">
        <label>Allowed Products</label>
        {error.allProducts && (
          <div className="text-destructive">{error.allProducts}</div>
        )}
        {error.productIds && (
          <div className="text-destructive">{error.productIds}</div>
        )}
        <div className="flex gap-2 items-center">
          <Checkbox
            id="allProducts"
            name="allProducts"
            checked={allProducts}
            onCheckedChange={(e) => setAllProducts(e === true)}
          />
          <Label htmlFor="allProducts">All Products</Label>
        </div>
        {products.map((product) => (
          <div key={product.id} className="flex gap-2 items-center">
            <Checkbox
              id={product.id}
              name="allProducts"
              disabled={allProducts}
              value={product.id}
            />
            <Label htmlFor={product.id}>{product.name}</Label>
          </div>
        ))}
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
