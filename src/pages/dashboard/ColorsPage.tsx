import ColorList from "../../components/color/ColorList"

const ColorsPage = () => {
  return (
    <>
      <div className="min-h-full bg-white rounded-md shadow">
          <div className="w-full h-full flex flex-col">
              <ColorList />
          </div>
      </div>
    </>
  )
}

export default ColorsPage