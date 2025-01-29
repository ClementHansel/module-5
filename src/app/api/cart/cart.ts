import { NextApiRequest, NextApiResponse } from "next";

let cart: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Return the current cart items
    res.status(200).json(cart);
  } else if (req.method === "POST") {
    // Add a new item to the cart
    const { product } = req.body;
    if (!product) {
      return res.status(400).json({ error: "Product data is required" });
    }

    cart.push(product);
    res.status(201).json(cart);
  } else if (req.method === "DELETE") {
    // Clear the cart or remove a specific item
    const { productId } = req.body;
    if (productId) {
      cart = cart.filter((item) => item.id !== productId);
      res.status(200).json(cart);
    } else {
      // Clear the entire cart
      cart = [];
      res.status(200).json(cart);
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
