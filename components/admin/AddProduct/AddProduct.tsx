//TODO
// add a redirect after adding product
// add error management on both image upload and add product calls

import cn from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "@lib/tags";
import { ImageUploader } from "@components/common";
import s from "./AddProduct.module.css";
import { ImageField, ProductType } from "utils/types/types";

const FORMDEFAULTVALUES = {
  name: "",
  price: 0,
  description: "",
  type: "",
  mainImage: {
    public_id: "",
    url: "",
    filename: "",
  },
  secondaryImage: [
    { public_id: "", url: "", filename: "" },
    { public_id: "", url: "", filename: "" },
    { public_id: "", url: "", filename: "" },
    { public_id: "", url: "", filename: "" },
    { public_id: "", url: "", filename: "" },
    { public_id: "", url: "", filename: "" },
  ],
};

const AddProduct = () => {
  const methods = useForm<ProductType>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: FORMDEFAULTVALUES,
  });

  const { fields } = useFieldArray({
    control: methods.control,
    name: "secondaryImage",
  });

  const [addProduct, { loading: addProductLoading }] = useMutation(
    ADD_PRODUCT,
    {
      onCompleted: (data) => {
        // reset form
        methods.reset(FORMDEFAULTVALUES);
        //redirect to product
      },
    }
  );

  const onSubmit = async (data: any, e: { preventDefault: () => void }) => {
    e.preventDefault();

    await addProduct({
      variables: {
        input: {
          ...data,
          secondaryImage: data.secondaryImage.filter(
            (image: ImageField) => image.public_id !== ""
          ),
        },
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <div className={s.root}>
        <h1 className="w-full text-2xl text-center my-7">Add a product</h1>
        <form
          className="flex flex-wrap"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="w-full mx-auto md:w-1/2 ">
            <div className={s.inputContainer}>
              <label className={s.label}>Product name</label>
              <input
                className={cn(s.input, {
                  [s.inputError]: methods.errors?.name?.message,
                })}
                ref={methods.register({
                  required: { value: true, message: "This is required." },
                })}
                name="name"
              />
              <div className={s.errorText}>
                <ErrorMessage errors={methods.errors} name="name" />
              </div>
            </div>

            <div className={s.inputContainer}>
              <label className={s.label}>Product price</label>
              <input
                className={cn(s.input, {
                  [s.inputError]: methods.errors?.price?.message,
                })}
                ref={methods.register({
                  required: { value: true, message: "This is required." },
                  valueAsNumber: true,
                })}
                name="price"
                type="number"
              />
              <div className={s.errorText}>
                <ErrorMessage errors={methods.errors} name="price" />
              </div>
            </div>

            <div className={s.inputContainer}>
              <label className={s.label}>Product description</label>
              <TextareaAutosize
                className={cn(
                  s.input,
                  {
                    [s.inputError]: methods.errors?.description?.message,
                  },
                  "whitespace-pre-wrap"
                )}
                ref={methods.register({
                  required: { value: true, message: "This is required." },
                })}
                name="description"
                minRows={5}
              />
              <div className={s.errorText}>
                <ErrorMessage errors={methods.errors} name="description" />
              </div>
            </div>

            <div className={s.inputContainer}>
              <label className={s.label}>Product type</label>
              <select
                className={cn(s.input, {
                  [s.inputError]: methods.errors?.type?.message,
                })}
                name="type"
                ref={methods.register({
                  required: { value: true, message: "This is required." },
                })}
              >
                <option value="Bike">Bike</option>
                <option value="Accesories">Accesories</option>
              </select>

              <div className={s.errorText}>
                <ErrorMessage errors={methods.errors} name="type" />
              </div>
            </div>

            <div className={cn(s.inputContainer)}>
              <label className={s.label}>Main image</label>
              <div
                className={cn(s.input, "max-h-60 h-60", {
                  [s.inputError]: methods.errors?.mainImage?.url?.message,
                })}
              >
                <ImageUploader
                  name="mainImage"
                  rules={{
                    required: { value: true, message: "This is required" },
                  }}
                />
              </div>
              <div className={s.errorText}>
                <ErrorMessage errors={methods.errors} name="mainImage.url" />
              </div>
            </div>

            <div className={cn(s.inputContainer)}>
              <label className={s.label}>Secondary images</label>
              <div className="grid grid-cols-2 gap-2">
                {fields.map((item, index) => {
                  return (
                    <div key={item.id} className={cn(s.input, "max-h-36")}>
                      <ImageUploader
                        name={`secondaryImage[${index}]`}
                        defaultValue=""
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={s.inputContainer}>
              <button
                className={s.button}
                type="submit"
                disabled={addProductLoading}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddProduct;
