import productModel, { IProduct } from "@lib/db/models/Product";
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
