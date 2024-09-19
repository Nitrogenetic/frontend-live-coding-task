import { Product } from '../../domain/product'
import { MockProductPageGateway } from '../gateways/product-page'

const mockProductPage = new MockProductPageGateway()

export const getProduct = (productId: string): Promise<Product> =>
  mockProductPage.getProduct(productId)
