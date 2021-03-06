import { SearchResults } from "@components/common";
import { GetServerSideProps } from "next";

const Search = ({ searchString }) => {
  return (
    <div className="min-h-screen">
      <div className="p-2 md:p-6">
        <SearchResults searchString={searchString} />
      </div>
    </div>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { searchString: query.q } };
};
