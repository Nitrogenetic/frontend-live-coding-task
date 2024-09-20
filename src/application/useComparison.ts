import { Product } from '../domain/product'
import { addToComparison, removeFromComparison } from '../domain/comparison'
import { useSelector } from 'react-redux'
import { comparisonSelector } from '../services/store/selectors/product-page'
import { setComparison } from '../services/store/actions/product-page'
import { useDispatch } from 'react-redux'

export const useComparison = () => {
  const comparison = useSelector(comparisonSelector)
  const dispatch = useDispatch()

  const addProductToCompare = (product: Product) => {
    const updated = addToComparison(comparison, product)
    dispatch(setComparison(updated))
  }

  const removeProductFromCompare = (product: Product) => {
    const updated = removeFromComparison(comparison, product)
    dispatch(setComparison(updated))
  }

  return { comparison, addProductToCompare, removeProductFromCompare }
}
