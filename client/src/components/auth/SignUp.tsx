import axios from "axios";
import { useState, useEffect } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  Input,
  InputOTP,
  InputOTPSlot,
} from "../ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationUser } from "./validation";
import { sendConfirmationCode } from "./services";
import { FormUser } from "./interface/userForm";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [userData, setUserData] = useState<FormUser | null>(null);
  const [code, setCode] = useState<string>("");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const navigate = useNavigate();

  const form: UseFormReturn<FormUser> = useForm<FormUser>({
    resolver: yupResolver(validationUser),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!isCodeSent || timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [isCodeSent, timer]);

  const sendCode = async (data: FormUser) => {
    setUserData(data);
    const generated = await sendConfirmationCode(data.email);
    if (generated) {
      setGeneratedCode(generated.toString());
      setIsCodeSent(true);
      setTimer(60);
    }
  };

  const verifyCode = async () => {
    if (code !== generatedCode) {
      toast.error("Incorrect code. Try again.");
      return;
    }
    if (!userData) {
      toast.error("User data is missing!");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/users", userData);
      console.log("User data submitted:", userData);
      toast.success("Signup successful!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Error submitting data. Please try again.");
    }
  };

  return (
    <section>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container max-w-section">
        <div className="h-screen flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-2xl font-bold text-center">SignUp</h1>
          {!isCodeSent ? (
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(sendCode)}
                autoComplete="off"
                className="flex flex-col gap-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="max-w-[15rem]">
                      <FormControl>
                        <Input {...field} placeholder="Enter your name" />
                      </FormControl>
                      {form.formState.errors.name && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="max-w-[15rem]">
                      <FormControl>
                        <Input {...field} placeholder="Enter your email" />
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
                        <Input {...field} placeholder="Enter your password" />
                      </FormControl>
                      {form.formState.errors.password && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.password.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit" className="block mx-auto mt-4">
                  Submit
                </Button>
              </form>
              <p className="text-sm">
                If you have account please{" "}
                <Link className="text-blue-500" to="/signin">
                  Sign In
                </Link>
              </p>
            </FormProvider>
          ) : (
            <div className="flex flex-col items-center gap-y-4">
              <p className="text-lg">Enter the verification code</p>
              <InputOTP value={code} onChange={setCode} maxLength={6}>
                {Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
              </InputOTP>
              <Button onClick={verifyCode} disabled={code.length !== 6}>
                Verify Code
              </Button>
              <p className="text-sm">Time left: {timer}s</p>
              {timer === 0 && (
                <Button onClick={() => sendCode(userData!)}>
                  Refresh Code
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
