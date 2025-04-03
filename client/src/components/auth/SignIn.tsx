import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import { SignInForm } from "./interface/userForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSignIn } from "./validation";
import { Button, FormControl, FormField, FormItem, Input } from "../ui";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "@/services/axiosInstance";

export default function SignIn() {
  const form: UseFormReturn<SignInForm & { confirmPassword: string }> = useForm(
    {
      resolver: yupResolver(validationSignIn),
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      mode: "onBlur",
    }
  );

  const onSubmit = async (data: SignInForm) => {
    try {
      const response = await axiosInstance.get(
        `/users/?name=${data.email}`
      );

      if (!response) {
        throw new Error("User not found!");
      }

      console.log(response.data);
    } catch (err) {
      console.error(err);
      toast.error("User not found!");
    }
  };

  return (
    <section>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container max-w-section">
        <div className="h-screen flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-2xl font-bold text-center">SignIn</h1>
          <FormProvider {...form}>
            <form
              className="flex flex-col gap-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="max-w-[15rem]">
                    <FormControl>
                      <Input {...field} placeholder="Enter your name" />
                    </FormControl>
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="max-w-[15rem]">
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    {form.formState.errors.password && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="max-w-[15rem]">
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm your password"
                      />
                    </FormControl>
                    {form.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <Button>Submit</Button>
            </form>
            <p className="text-sm">
              If you don't have account please{" "}
              <Link className="text-blue-500" to="/">
                Sign Up
              </Link>
            </p>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
