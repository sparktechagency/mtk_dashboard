
export const getStockStatusBg = (status: string) => {
    switch (status) {
        case "In Stock":
            return "bg-blue-200"
        case "Out of Stock":
            return "bg-red-200"
        case "Limited Stock":
            return "bg-red-200"
    }
}

export const getStockStatusColor = (status: string) => {
    switch (status) {
        case "In Stock":
            return "text-blue-500"
        case "Out of Stock":
            return "text-red-500"
        case "Limited Stock":
            return "text-yellow-500"
    }
}

