import { RootState } from '..'

const productPageSelector = (state: RootState) => state.productPage

export const comparisonSelector = (state: RootState) => productPageSelector(state).comparison
