import ProductList from "../../components/product/ProductList";


const ProductsPage = () => {

  return (
    <>
      <div className="min-h-full bg-white rounded-md shadow">
          <div className="w-full h-full flex flex-col">
              <ProductList />
          </div>
      </div>
    </>
  )
}

export default ProductsPage;