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

  input ImageInput {
    public_id: String
    url: String
    filename: String
  }

  input ProductInput {
    name: String
    price: Float
    description: String
    type: String
    mainImage: ImageInput
    secondaryImage: [ImageInput]
  }

  type Query {
    getProduct(_id: ID!): Product
    getAllProducts: [Product]
    getAllBikes: [Product]
    getAllAccesories: [Product]
  }

  type Mutation {
    addProduct(input: ProductInput): ID
    editProduct(_id: ID!, input: ProductInput): ID
    deleteProduct(_id: ID!): Boolean
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
        throw new ApolloError("Error retrieving all bikes");
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
        throw new ApolloError("Error retrieving all accesories");
      }

      return products;
    },
  },

  Mutation: {
    addProduct: async (
      _root: any,
      { input },
      { dbConnection }: { dbConnection: Connection }
    ): Promise<IProduct> => {
      const Product = productModel(dbConnection);

      const newProduct = new Product({ ...input });

      try {
        await newProduct.save();
      } catch (error) {
        console.error("addProduct error: ", error);
        throw new ApolloError("Error adding product");
      }

      return newProduct._id;
    },

    editProduct: async (
      _root: any,
      { _id, input },
      { dbConnection }: { dbConnection: Connection }
    ): Promise<IProduct> => {
      const Product = productModel(dbConnection);

      try {
        await Product.findByIdAndUpdate(_id, { ...input });
      } catch (error) {
        console.error("editProduct error: ", error);
        throw new ApolloError("Error editing product");
      }

      return _id;
    },

    deleteProduct: async (
      _root: any,
      { _id },
      { dbConnection }: { dbConnection: Connection }
    ): Promise<boolean> => {
      const Product = productModel(dbConnection);

      try {
        await Product.findByIdAndDelete(_id);
      } catch (error) {
        console.error("deleteProduct error: ", error);
        throw new ApolloError("Error deleting product");
      }

      return true;
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
