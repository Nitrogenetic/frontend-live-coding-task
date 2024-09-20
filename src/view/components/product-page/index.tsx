import { FC, useState } from 'react'
import { useDetailProduct } from '../../../services/adatpers/useDetailProduct'
import './product-page.css'
import { useComparison } from '../../../application/useComparison'
import { Product } from '../../../domain/product'
import { Modal } from '../common/modal'

type ModalState = { product?: Product; isOpen: boolean }
const INIT_MODAL = { product: undefined, isOpen: false }

export const ProductPage: FC = () => {
  const [modalState, setModalState] = useState<ModalState>(INIT_MODAL)
  const { detailProduct } = useDetailProduct()
  const { comparison, addProductToCompare, removeProductFromCompare } = useComparison()

  const analogProducts = detailProduct?.analogProducts
  const relatedProducts = detailProduct?.relatedProducts
  const noSignsProducts = detailProduct?.noSignsProducts

  const handleAddToCompare = (product: Product) => () => addProductToCompare(product)
  const handleRemoveFromCompare = (product: Product) => () => removeProductFromCompare(product)

  const handleOpenModal = (product: Product) => () => setModalState({ product, isOpen: true })
  const handleCloseModal = () => setModalState({ product: undefined, isOpen: false })

  return (
    <>
      <div>
        <div className="main-product-compare-block">
          <div className="main-product">
            <h1>{detailProduct?.name}</h1>
            <p>Price: {detailProduct?.price}$</p>
          </div>
          <div className="compare-products">
            <p className="compare-products-title">Сравнение:</p>
            {comparison.products.map((comparisonProduct) => (
              <div className="compare-product" key={comparisonProduct.id}>
                <button className="remove" onClick={handleRemoveFromCompare(comparisonProduct)}>
                  X
                </button>
                <h2>{comparisonProduct.name}</h2>
                <p>Price: {comparisonProduct?.price}$</p>
              </div>
            ))}
          </div>
        </div>

        <ul className="main-product-info">
          {analogProducts?.map((analog) => (
            <li key={analog.id}>
              Аналог: <button onClick={handleAddToCompare(analog)}>{analog.name}</button>
            </li>
          ))}

          {relatedProducts?.map((related) => (
            <li key={related.id}>
              Сопутствующий товар:{' '}
              <button onClick={handleOpenModal(related)}>{related.name}</button>
            </li>
          ))}

          {noSignsProducts?.map((noSign) => (
            <li key={noSign.id}>
              <button onClick={handleOpenModal(noSign)}>{noSign.name}</button>
            </li>
          ))}
        </ul>
      </div>

      {modalState.isOpen && (
        <Modal onClose={handleCloseModal}>
          <h1>{modalState?.product?.name}</h1>
          <p>Price: {modalState?.product?.price}$</p>
        </Modal>
      )}
    </>
  )
}
