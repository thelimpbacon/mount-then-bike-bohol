import router, { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import { useForm } from "react-hook-form";
import cn from "classnames";
import s from "./Signin.module.css";
import { route } from "next/dist/next-server/server/router";

interface Inputs {
  email: string;
}

const Signin = () => {
  const { register, errors, handleSubmit } = useForm<Inputs>();
  const router = useRouter();
  const { callbackUrl } = router.query;

  const onSubmit = (data: Inputs, e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn("email", {
      email: data.email,
      callbackUrl:
        (callbackUrl as string) ?? `${process.env.NEXT_PUBLIC_SITE_URL}/admin`,
    });
  };

  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={cn(s.input, errors.email && s.inputError)}
          name="email"
          placeholder="Your admin email"
          ref={register({
            required: "This field is required.",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "This is an invalid email.",
            },
          })}
        />
        {errors.email && (
          <div className={s.errorMessage}>
            <small>{errors.email.message}</small>
          </div>
        )}
        <button className={s.button} type="submit">
          Sign in with Email
        </button>
      </form>
    </div>
  );
};

export default Signin;
