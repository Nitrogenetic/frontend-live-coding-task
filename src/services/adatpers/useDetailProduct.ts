import { useEffect, useState } from 'react'
import { getCategories } from '../api/categories'
import { getLinkedProducts } from '../api/linkedProducts'
import { getProduct } from '../api/product'
import { Category, DetailProduct, getDetailProduct, Product } from '../../domain/product'
import { useParams } from 'react-router-dom'

export const useDetailProduct = () => {
  const { productId } = useParams<{ productId: string }>()

  const [detailProduct, setDetailProduct] = useState<DetailProduct>()

  useEffect(() => {
    handleDetailProductInState()
  }, [productId])

  const handleDetailProductInState = async () => {
    if (productId) {
      const product = await getProduct(productId)
      const linkedProducts = await getLinkedProducts(productId)
      const categories = await getCategories()

      const famousCategories = getFamousCategories(categories)
      const categoriesNotInProduct = getCategoriesNotInProduct(famousCategories, product)

      const analogProducts = linkedProducts.filter(analogProductsFilter(product))
      const relatedProducts = linkedProducts.filter(relatedProductsFilter(categoriesNotInProduct))
      const noSignsProducts = linkedProducts.filter(noSignsProductsFilter(famousCategories))

      setDetailProduct(getDetailProduct(product, analogProducts, relatedProducts, noSignsProducts))
    }
  }

  return { detailProduct }
}

const getFamousCategories = (categories?: Category[]): Category[] =>
  categories
    ?.map((category) => {
      if (category.children) {
        const categoryWithItsChildren = [category, ...getFamousCategories(category.children)]
        return categoryWithItsChildren
      }
      return category
    })
    .flat(1) || []

const relatedProductsFilter = (categories: Category[]) => (product: Product) =>
  categories.some((category) => category.id === product.category?.id)

const analogProductsFilter = (product: Product) => (linkedProduct: Product) =>
  linkedProduct.category?.id === product.category?.id

const noSignsProductsFilter = (categories: Category[]) => (product: Product) =>
  !categories.some((category) => category.id === product.category?.id)

const getCategoriesNotInProduct = (categories: Category[], product: Product) =>
  categories.filter((famousCategory) => famousCategory.id !== product.category?.id)
