import { createAction } from '@reduxjs/toolkit'
import { Comparison } from '../../../domain/comparison'

export const setComparison = createAction<Comparison>('product-page/add-product-to-compare-list')
