import { Product } from '../../domain/product'
import { MockProductPageGateway } from '../gateways/product-page'

const mockProductPage = new MockProductPageGateway()

export const getLinkedProducts = (productId: string): Promise<Product[]> =>
  mockProductPage.getLinkedProducts(productId)
