import TransactionList from "../../components/transaction/TransactionList"


const TransactionsPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <TransactionList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default TransactionsPage