import SubscriptionList from "../../components/subscription/SubscriptionList"

const SubscriptionsPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <SubscriptionList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubscriptionsPage