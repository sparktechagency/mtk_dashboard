import UpdateProductImageModal from "../modal/product/UpdateProductImageModal";

const UpdateImagePreview = () => {
    const images = [
        "https://res.cloudinary.com/dwok2hmb7/image/upload/v1753952500/MTK-Ecommerce/sedjgkwozcmlngrqiurx.jpg",
        "https://res.cloudinary.com/dwok2hmb7/image/upload/v1753952500/MTK-Ecommerce/uwldjd0klhopufultpb4.jpg",
        "https://res.cloudinary.com/dwok2hmb7/image/upload/v1753952500/MTK-Ecommerce/namfxtsy4qxkgkllpsta.jpg"
    ];
    
    return (
        <>
            
            <div>
                <h1 className="flex items-center gap-2 mb-2">
                    <span className="font-bold">Images</span>
                    <UpdateProductImageModal productId={"898787"}/>
                </h1>
                {images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {images?.map((imgUrl, index) => (
                        <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={imgUrl || "/placeholder.svg"}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </>
    )
}

export default UpdateImagePreview