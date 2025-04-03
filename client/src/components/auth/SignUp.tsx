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
import { validationSignUp } from "./validation";
import { sendConfirmationCode } from "./services";
import { SignUpFrom } from "./interface/userForm";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/services/axiosInstance";

export default function SignUp() {
  const [userData, setUserData] = useState<SignUpFrom | null>(null);
  const [code, setCode] = useState<string>("");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const navigate = useNavigate();

  const form: UseFormReturn<SignUpFrom> = useForm<SignUpFrom>({
    resolver: yupResolver(validationSignUp),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!isCodeSent || timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [isCodeSent, timer]);

  const checkUserExists = async (name: string, email: string) => {
    try {
      const { data } = await axiosInstance.get(
        `/users/?name=${name}&email=${email}`
      );
      return (
        Array.isArray(data) &&
        data.some((user) => user.name === name || user.email === email)
      );
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };

  const sendCode = async (data: SignUpFrom) => {
    if (await checkUserExists(data.name, data.email)) {
      toast.error("Пользователь уже существует!");
      return;
    }
    setUserData(data);
    const generated = await sendConfirmationCode(data.email);
    if (generated) {
      setGeneratedCode(generated.toString());
      setIsCodeSent(true);
      setTimer(60);
    }
  };

  const verifyCode = async () => {
    if (code !== generatedCode || !userData) {
      toast.error(
        code !== generatedCode
          ? "Incorrect code. Try again."
          : "User data is missing!"
      );
      return;
    }
    try {
      await axiosInstance.post("/users", userData);
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
                {(["name", "email", "password"] as const).map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field}
                    render={({ field: inputField }) => (
                      <FormItem className="max-w-[15rem]">
                        <FormControl>
                          <Input
                            {...inputField}
                            placeholder={`Enter your ${field}`}
                            type={field === "password" ? "password" : "text"}
                          />
                        </FormControl>
                        {form.formState.errors[field] && (
                          <p className="text-red-500 text-sm">
                            {form.formState.errors[field]?.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                ))}
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
