import { useQuery } from "@apollo/client";
import { SEARCH_PRODUCTS } from "@lib/tags";
import { SearchCatalogue } from "@components/common";
import { useEffect, useState } from "react";

interface SearchResultsProps {
  searchString: string;
}

const SearchResults = ({ searchString }: SearchResultsProps) => {
  const [timer, setTimer] = useState(true);
  const { data, loading, error } = useQuery(SEARCH_PRODUCTS, {
    variables: { searchString },
    fetchPolicy: "cache-and-network",
    onError: () => {
      return null;
    },
  });

  useEffect(() => {
    let loadTimer: any;
    if (!loading) {
      setTimer(true);
      loadTimer = setTimeout(() => {
        setTimer(false);
      }, 500);
    }
    return () => clearTimeout(loadTimer);
  }, [loading]);

  if (loading || timer) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:mt-5">
        {[...Array(4)].map((i) => {
          return (
            <div
              key={Math.random()}
              className="relative mx-4 my-2 bg-gray-500 rounded-lg shadow-md h-80 lg:h-64 lg:m-4 animate-pulse"
            >
              <div className="absolute bottom-0 w-full px-4 py-2 bg-gray-300 rounded-b-lg animate-pulse">
                <div className="hidden w-full my-1 bg-gray-700 h-7 lg:block"></div>
                <div className="w-3/4 my-1 bg-gray-700 lg:w-1/2 h-7"></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-2xl">Something went wrong. Try again later</div>
    );
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
