
const FaqLoading = () => {
  const loadingArray = [1,2,3,4,5,6];

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-2 gap-4 bg-white rounded-lg shadow-md p-4 animate-pulse">
        
        {loadingArray?.map((_item, i) => (
             <div key={i} className="flex flex-col justify-between border rounded-md p-4 space-y-3">
             <div className="h-4 bg-gray-300 rounded w-2/3" />
             <div className="h-3 bg-gray-200 rounded w-full" />
             <div className="h-3 bg-gray-200 rounded w-5/6" />
             <div className="h-3 bg-gray-200 rounded w-1/2" />
             <div className="flex justify-end space-x-2 pt-2">
               <div className="h-6 w-6 bg-gray-300 rounded-full" />
               <div className="h-6 w-6 bg-gray-300 rounded-full" />
             </div>
           </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="h-10 w-28 bg-gray-300 rounded-md animate-pulse" />
      </div>
    </div>
  );
};

export default FaqLoading;
