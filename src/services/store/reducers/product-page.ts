import { createReducer } from '@reduxjs/toolkit'
import { setComparison } from '../actions/product-page'
import { DetailProduct } from '../../../domain/product'
import { Comparison } from '../../../domain/comparison'

type CatalogPageState = {
  detailProduct?: DetailProduct
  comparison: Comparison
}

const defaultState: CatalogPageState = {
  detailProduct: undefined,
  comparison: { products: [] },
}

export const productPageReducer = createReducer<CatalogPageState>(defaultState, (builder) => {
  builder.addCase(setComparison, (state, action) => {
    state.comparison = action.payload
  })
})
