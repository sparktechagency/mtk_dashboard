import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import CategoryTable from "./CategoryTable";

const CategoryList = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery(undefined);
  const categories = data?.data || [];

  if (isLoading) {
    return <ListLoading />;
  }

  if (!isLoading && !isError) {
    return <CategoryTable categories={categories}/>;
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />;
  }
};

export default CategoryList;
