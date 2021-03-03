import productModel, {
  IProduct,
  ISearch,
  IParsedSearchProduct,
} from "@lib/db/models/Product";
import { dbConnect } from "@lib/db/dbConnect";
import { ApolloServer, gql, ApolloError } from "apollo-server-micro";
import { Connection, Model } from "mongoose";

const typeDefs = gql`
  type Product {
    _id: ID
    name: String
    price: Float
    description: String
    type: String
    mainImage: Image
    secondaryImage: [Image]
  }

  type SearchProduct {
    _id: ID
    name: String
    price: Float
    description: String
    type: String
    mainImage: Image
    secondaryImage: [Image]
    highlights: Highlight
  }

  type Highlight {
    name: [HighlightText]
    type: [HighlightText]
  }

  type HighlightText {
    value: String
    type: String
  }

  type Image {
    public_id: String
    url: String
    filename: String
  }

  type Query {
    getProduct(_id: ID!): Product
    getAllProducts: [Product]
    getAllBikes: [Product]
    getAllAccesories: [Product]
    searchProducts(searchString: String): [SearchProduct]
  }
`;

const resolvers = {
  Query: {
    getProduct: async (
      _root: any,
      { _id },
      { dbConnection }: { dbConnection: Connection }
    ): Promise<IProduct> => {
      const ProductModel: Model<IProduct> = productModel(dbConnection);

      let product: IProduct;

      try {
        product = await ProductModel.findById(_id);
      } catch (error) {
        console.error("getProduct error: ", error);

        throw new ApolloError("Error retrieving product");
      }

      return product;
    },
    getAllProducts: async (
      _root: any,
      __args: any,
      { dbConnection }: { dbConnection: Connection }
    ): Promise<Array<IProduct>> => {
      const ProductModel: Model<IProduct> = productModel(dbConnection);

      let products: Array<IProduct>;

      try {
        products = await ProductModel.find();
      } catch (error) {
        console.error("getAllProducts error: ", error);
        throw new ApolloError("Error retrieving all products");
      }

      return products;
    },

    getAllBikes: async (
      _root: any,
      __args: any,
      { dbConnection }: { dbConnection: Connection }
    ): Promise<Array<IProduct>> => {
      const ProductModel: Model<IProduct> = productModel(dbConnection);

      let products: Array<IProduct>;

      try {
        products = await ProductModel.find({ type: "Bike" });
      } catch (error) {
        console.error("getAllProducts error: ", error);
        throw new ApolloError("Error retrieving all products");
      }

      return products;
    },
    getAllAccesories: async (
      _root: any,
      __args: any,
      { dbConnection }: { dbConnection: Connection }
    ): Promise<Array<IProduct>> => {
      const ProductModel: Model<IProduct> = productModel(dbConnection);

      let products: Array<IProduct>;

      try {
        products = await ProductModel.find({ type: "Accesories" });
      } catch (error) {
        console.error("getAllProducts error: ", error);
        throw new ApolloError("Error retrieving all products");
      }

      return products;
    },
    searchProducts: async (
      _root: any,
      { searchString }: { searchString: string },
      { dbConnection }: { dbConnection: Connection }
    ): Promise<IParsedSearchProduct[]> => {
      const ProductModel: Model<IProduct> = productModel(dbConnection);

      let searchProducts: Array<ISearch>;
      let products: Array<IParsedSearchProduct> | [];

      try {
        searchProducts = await ProductModel.aggregate([
          {
            $search: {
              index: "searchIndex",
              text: {
                query: searchString,
                path: ["name", "type"],
                fuzzy: {
                  maxEdits: 2,
                },
              },
              highlight: {
                path: ["name", "type"],
              },
            },
          },
          {
            $addFields: {
              highlights: {
                $meta: "searchHighlights",
              },
            },
          },
        ]);

        products =
          searchProducts.length === 0
            ? []
            : searchProducts.map((p) => {
                const highlightName =
                  p.highlights.filter((h) => h.path === "name")[0]?.texts || [];
                const highlightDescription =
                  p.highlights.filter((h) => h.path === "type")[0]?.texts || [];

                return {
                  ...p,
                  highlights: {
                    name: highlightName,
                    type: highlightDescription,
                  },
                };
              });
      } catch (error) {
        console.error("searchProducts error: ", error);
        throw new ApolloError("Error searching products");
      }

      return products;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const dbConnection = await dbConnect();
    return { dbConnection };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
