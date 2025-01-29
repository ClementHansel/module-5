import { NextResponse } from "next/server";

let cart: any[] = [];

export async function GET() {
  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const { product } = await request.json();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  return NextResponse.json({ message: "Product added to cart", cart });
}
