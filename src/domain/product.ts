export interface Category {
  id: string
  name: string
  children?: Category[]
}

export interface Product {
  id: string
  name: string
  price: number
  category?: Partial<Category>
}

export interface DetailProduct extends Product {
  analogProducts?: Product[]
  relatedProducts?: Product[]
  noSignsProducts?: Product[]
}

export const getDetailProduct = (
  product: Product,
  analogProducts?: Product[],
  relatedProducts?: Product[],
  noSignsProducts?: Product[]
): DetailProduct => {
  return { ...product, analogProducts, relatedProducts, noSignsProducts }
}
