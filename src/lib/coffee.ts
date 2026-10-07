import prisma from "@/lib/prisma";
import type { Product } from "@prisma/client";

export type CoffeeProduct = Product;

export async function getAllProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}
