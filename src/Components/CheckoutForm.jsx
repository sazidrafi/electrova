"use client";

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import { useState } from "react";

const CheckoutForm = ({
  userId,
  user,
  cart,
  total,
  couponCode,
  onSuccess,
  discount,
  subtotal,
}) => {
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setOrderMessage("");

    // Read all field values from the form by their "name"
    const formData = new FormData(e.currentTarget);

    const customer = {
      fullName: formData.get("fullName")?.toString().trim(),
      phone: formData.get("phone")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      district: formData.get("district")?.toString().trim(),
      address: formData.get("address")?.toString().trim(),
      note: formData.get("note")?.toString().trim(),
    };
    const paymentMethod = formData.get("paymentMethod");

    try {
      setIsPlacing(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          customer,
          paymentMethod,
          couponCode: couponCode || null,
          subtotal,
          discount,
          total,
          //   items: cart.map((item) => ({
          //     productId: item.productId,
          //     productName: item.productName,
          //     productPrice: Number(item.productPrice),
          //     quantity: Number(item.quantity),
          //   })),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to place order");
      }

      onSuccess?.();
      toast.success("Order Placed Successfully");
    } catch (error) {
      console.error("Place order error:", error);
      setOrderMessage(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <Form className="mt-10 w-full" onSubmit={onSubmit}>
      <Fieldset className="w-full">
        <Fieldset.Legend className="text-2xl sm:text-3xl font-semibold">
          Delivery <span className="text-blue-800">Details</span>
        </Fieldset.Legend>
        <Description>Tell us where to deliver your order.</Description>

        <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            isRequired
            name="fullName"
            defaultValue={user?.name || ""}
            validate={(value) => {
              if (value.trim().length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Full Name</Label>
            <Input placeholder="Your full name" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="phone"
            type="tel"
            validate={(value) => {
              if (!/^01[3-9]\d{8}$/.test(value.trim())) {
                return "Enter a valid number, e.g. 01712345678";
              }
              return null;
            }}
          >
            <Label>Phone Number</Label>
            <Input placeholder="01XXXXXXXXX" />
            <FieldError />
          </TextField>

          <TextField name="email" type="email" defaultValue={user?.email || ""}>
            <Label>Email (optional)</Label>
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>

          <TextField isRequired name="district">
            <Label>District / City</Label>
            <Input placeholder="e.g. Rajshahi" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="address"
            className="sm:col-span-2"
            validate={(value) => {
              if (value.trim().length < 10) {
                return "Please enter a complete address";
              }
              return null;
            }}
          >
            <Label>Full Address</Label>
            <TextArea placeholder="House, road, area, landmark" />
            <Description>House, road, area and a nearby landmark</Description>
            <FieldError />
          </TextField>

          <TextField name="note" className="sm:col-span-2">
            <Label>Order Note (optional)</Label>
            <TextArea placeholder="Any special instruction for delivery" />
          </TextField>
        </FieldGroup>

        {/* Payment method */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-3">Payment Method</h3>

          <label className="flex items-center gap-3 rounded-xl border border-blue-700 bg-blue-50 dark:bg-gray-800 p-4 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              defaultChecked
              className="accent-blue-700"
            />
            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-gray-500">
                Pay in cash when your order arrives.
              </p>
            </div>
          </label>
        </div>

        {orderMessage && <p className="text-sm text-red-500">{orderMessage}</p>}

        <Fieldset.Actions>
          <Button
            type="submit"
            isDisabled={isPlacing}
            className="bg-blue-700 hover:bg-blue-800 text-white w-full rounded-lg text-xl pt-7 pb-7"
          >
            {isPlacing
              ? "Placing Order..."
              : `Place Order • ৳${total.toFixed(2)}`}
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  );
};

export default CheckoutForm;
