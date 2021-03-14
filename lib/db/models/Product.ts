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
  mainImage: {
    public_id: string;
    url: string;
    filename: string;
  };
  secondaryImage: [
    {
      public_id: string;
      url: string;
      filename: string;
    }
  ];
}

export interface ISearch extends IProduct {
  highlights: Array<{
    path: "name" | "type";
    texts: Array<{
      value: string;
      type: "text" | "hit";
    }>;
  }>;
}

const ProductSchema: Schema = new mongoose.Schema(
  {
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
    mainImage: {
      public_id: {
        type: SchemaTypes.String,
      },
      url: {
        type: SchemaTypes.String,
      },
      filename: {
        type: SchemaTypes.String,
      },
    },
    secondaryImage: [
      {
        public_id: {
          type: SchemaTypes.String,
        },
        url: {
          type: SchemaTypes.String,
        },
        filename: {
          type: SchemaTypes.String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export interface IParsedSearchProduct {
  name: string;
  price: number;
  description: string;
  type: string;
  mainImage: {
    public_id: string;
    url: string;
    filename: string;
  };
  secondaryImage: [
    {
      public_id: string;
      url: string;
      filename: string;
    }
  ];
  highlights: {
    name?: { value: string; type: "text" | "hit" }[];
    type?: { value: string; type: "text" | "hit" }[];
  };
}

const collectionName: string = "product";

const productModel = (conn: Connection): Model<IProduct | ISearch> =>
  //@ts-ignore
  conn.model(collectionName, ProductSchema);

export default productModel;
