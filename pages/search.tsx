import { SearchResults } from "@components/common";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const Search = () => {
  const { query } = useRouter();
  return (
    <div className="lg:min-h-screen">
      <div className="p-2 md:p-6">
        <SearchResults searchString={query.q as string} />
      </div>
    </div>
  );
};

export default Search;
