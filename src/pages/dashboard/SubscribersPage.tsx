import SubscriberList from "../../components/subscriber/SubscriberList"


const SubscribersPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <SubscriberList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubscribersPage