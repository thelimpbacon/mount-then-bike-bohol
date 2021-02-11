import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import TextareaAutosize from "react-textarea-autosize";
import cn from "classnames";
import s from "./AddProduct.module.css";
``;
interface AddProductProps {}

interface FormInput {
  name: string;
  price: number;
  description: string;
  type: string;
  mainImage: any;
  secondaryImage1: any;
  secondaryImage2: any;
  secondaryImage3: any;
  secondaryImage4: any;
  secondaryImage5: any;
}

const AddProduct = ({}: AddProductProps) => {
  const { register, errors, handleSubmit } = useForm<FormInput>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      type: "",
      mainImage: "",
      secondaryImage1: "",
      secondaryImage2: "",
      secondaryImage3: "",
      secondaryImage4: "",
      secondaryImage5: "",
    },
  });

  const onSubmit = (data: any, e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className={s.root}>
      <h1 className="w-full text-center text-2xl my-7">Add a product</h1>
      <form className="flex flex-wrap" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full md:w-1/2 mx-auto ">
          <div className={s.inputContainer}>
            <label className={s.label}>Product name</label>
            <input
              className={cn(s.input, {
                [s.inputError]: errors?.name?.message,
              })}
              ref={register({
                required: { value: true, message: "This is required." },
              })}
              name="name"
            />
            <div className={s.errorText}>
              <ErrorMessage errors={errors} name="name" />
            </div>
          </div>

          <div className={s.inputContainer}>
            <label className={s.label}>Product price</label>
            <input
              className={cn(s.input, {
                [s.inputError]: errors?.price?.message,
              })}
              ref={register({
                required: { value: true, message: "This is required." },
              })}
              name="price"
              type="number"
            />
            <div className={s.errorText}>
              <ErrorMessage errors={errors} name="price" />
            </div>
          </div>

          <div className={s.inputContainer}>
            <label className={s.label}>Product description</label>
            <TextareaAutosize
              className={cn(s.input, {
                [s.inputError]: errors?.description?.message,
              })}
              ref={register({
                required: { value: true, message: "This is required." },
              })}
              name="description"
              minRows={5}
            />
            <div className={s.errorText}>
              <ErrorMessage errors={errors} name="description" />
            </div>
          </div>

          <div className={s.inputContainer}>
            <label className={s.label}>Product type</label>
            <select
              className={cn(s.input, {
                [s.inputError]: errors?.type?.message,
              })}
              name="type"
              ref={register({
                required: { value: true, message: "This is required." },
              })}
            >
              <option value="Bike">Bike</option>
              <option value="Accesories">Accesories</option>
            </select>

            <div className={s.errorText}>
              <ErrorMessage errors={errors} name="type" />
            </div>
          </div>

          <div className={s.inputContainer}>
            <label className={s.label}>Main Image</label>
            <input
              className={cn(s.input, {
                [s.inputError]: errors?.mainImage?.message,
              })}
              ref={register({
                required: { value: true, message: "This is required." },
              })}
              name="mainImage"
              type="file"
              accept=".png, .jpg, .jpeg"
            />

            <div className={s.errorText}>
              <ErrorMessage errors={errors} name="mainImage" />
            </div>
          </div>

          <div className={s.inputContainer}>
            <label className={s.label}>Secondary Images</label>
            <input
              className={cn(s.input, "my-2", {
                [s.inputError]: errors?.secondaryImage1?.message,
              })}
              ref={register}
              name="secondaryImage1"
              type="file"
              accept=".png, .jpg, .jpeg"
            />
            <input
              className={cn(s.input, "my-2", {
                [s.inputError]: errors?.secondaryImage2?.message,
              })}
              ref={register}
              name="secondaryImage2"
              type="file"
              accept=".png, .jpg, .jpeg"
            />
            <input
              className={cn(s.input, "my-2", {
                [s.inputError]: errors?.secondaryImage3?.message,
              })}
              ref={register}
              name="secondaryImage3"
              type="file"
              accept=".png, .jpg, .jpeg"
            />
            <input
              className={cn(s.input, "my-2", {
                [s.inputError]: errors?.secondaryImage4?.message,
              })}
              ref={register}
              name="secondaryImage4"
              type="file"
              accept=".png, .jpg, .jpeg"
            />
            <input
              className={cn(s.input, "my-2", {
                [s.inputError]: errors?.secondaryImage5?.message,
              })}
              ref={register}
              name="secondaryImage5"
              type="file"
              accept=".png, .jpg, .jpeg"
            />
          </div>

          <div className={s.inputContainer}>
            <button className={s.button} type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
