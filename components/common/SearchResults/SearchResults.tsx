import { useQuery } from "@apollo/client";
import { SEARCH_PRODUCTS } from "@lib/tags";
import { SearchCatalogue } from "@components/common";

interface SearchResultsProps {
  searchString: string;
}

const SearchResults = ({ searchString }: SearchResultsProps) => {
  const { data, loading, error } = useQuery(SEARCH_PRODUCTS, {
    variables: { searchString },
    fetchPolicy: "cache-and-network",
  });
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div>
      {data.searchProducts.length === 0 ? (
        <h2 className="text-2xl">
          No results found for <span className="underline">{searchString}</span>{" "}
        </h2>
      ) : (
        <h2 className="text-2xl">
          Search results for <span className="underline">{searchString}</span>
        </h2>
      )}
      <SearchCatalogue products={data.searchProducts} />
    </div>
  );
};

export default SearchResults;
