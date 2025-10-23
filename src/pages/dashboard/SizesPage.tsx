import SizeList from "../../components/size/SizeList"


const SizesPage = () => {
  return (
    <>
      <div className="min-h-full bg-white rounded-md shadow">
          <div className="w-full h-full flex flex-col">
              <SizeList />
          </div>
      </div>
    </>
  )
}

export default SizesPage