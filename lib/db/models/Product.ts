import mongoose, {
  Connection,
  Document,
  Model,
  Schema,
  SchemaTypes,
} from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  type: string;
}

const ProductSchema: Schema = new mongoose.Schema({
  name: {
    type: SchemaTypes.String,
  },
  price: {
    type: SchemaTypes.Number,
  },
  description: {
    type: SchemaTypes.String,
  },
  type: {
    type: SchemaTypes.String,
  },
});

const collectionName: string = "product";

const productModel = (conn: Connection): Model<IProduct> =>
  //@ts-ignore
  conn.model(collectionName, ProductSchema);

export default productModel;
