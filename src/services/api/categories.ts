import { Category } from '../../domain/product'
import { MockProductPageGateway } from '../gateways/product-page'

const mockProductPage = new MockProductPageGateway()

export const getCategories = (): Promise<Category[]> => mockProductPage.getCategories()
