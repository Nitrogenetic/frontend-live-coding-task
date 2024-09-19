import { Product } from './product'

export interface Comparison {
  products: Product[]
}

export const addToComparison = (comparison: Comparison, productToAdd: Product): Comparison => {
  const isProductInComparison = comparison.products.some(
    (product) => product.id === productToAdd.id
  )
  if (isProductInComparison) {
    return comparison
  }
  const products = [...comparison.products, productToAdd]
  return { ...comparison, products }
}

export const removeFromComparison = (
  comparison: Comparison,
  productToRemove: Product
): Comparison => {
  const products = comparison.products.filter((product) => product.id !== productToRemove.id)
  return { ...comparison, products }
}
