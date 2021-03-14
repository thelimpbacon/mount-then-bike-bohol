import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import cn from "classnames";
import { Search } from "../Icons";
import s from "./Searchbar.module.css";

interface SearchbarProps {
  className?: string;
  id?: string;
}

interface InputType {
  searchString: string;
}

const Searchbar = ({ className, id = "search" }: SearchbarProps) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<InputType>({
    defaultValues: {
      searchString: "",
    },
  });

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    const trimmed = data.searchString.trim();

    if (trimmed.length < 1) {
      return;
    }

    //submit search
    router.push(`/search?q=${trimmed}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "relative text-sm bg-accents-1 w-full transition-colors duration-150",
        className
      )}
    >
      <label className="hidden" htmlFor={id}>
        Search
      </label>
      <input
        id={id}
        className={s.input}
        name="searchString"
        placeholder="Search..."
        ref={register({ required: true })}
      />
      <button className={s.iconContainer}>
        <Search className={s.icon} />
      </button>
    </form>
  );
};

export default Searchbar;
