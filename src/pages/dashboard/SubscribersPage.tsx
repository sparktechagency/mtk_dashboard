import SubscriberList from "../../components/subsciber/SubscriberList"


const SubscribersPage = () => {
  return (
    <>
      <div className="min-h-full bg-white rounded-md shadow">
        <div className="w-full h-full flex flex-col">
          <SubscriberList />
        </div>
      </div>
    </>
  )
}

export default SubscribersPage