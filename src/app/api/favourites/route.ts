import { NextResponse } from "next/server";

let favourites: any[] = [];

export async function GET() {
  return NextResponse.json(favourites, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { product } = await req.json();
    if (!product) {
      return NextResponse.json(
        { error: "Invalid product data" },
        { status: 400 }
      );
    }

    const exists = favourites.some((item) => item.id === product.id);
    if (!exists) {
      favourites.push(product);
    }

    return NextResponse.json(
      { message: "Product added to favourites", favourites },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}
