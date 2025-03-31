import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { validationProduct } from "./validation";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  Input,
  Textarea,
} from "../ui";
import { useImageUpload } from "./services";
import { FormProduct } from "./interface/productForm";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Products() {
  const form = useForm<FormProduct>({
    resolver: yupResolver(validationProduct),
    defaultValues: {
      imagePath: "",
      title: "",
      category: "",
      price: 1000,
      description: "",
    },
    mode: "onBlur",
  });

  const { handleImageChange, loading } = useImageUpload(form.setValue);

  const onSubmit = async (product: FormProduct) => {
    try {
      await axios.post("http://localhost:3000/api/products", product);
      console.log("User data submitted:", product);
      toast.success("Added product successful!");

      form.reset({
        imagePath: "",
        title: "",
        category: "",
        price: 1000,
        description: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error submitting data. Please try again.");
    }
  };

  return (
    <section className="mt-20">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container max-w-section">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center m-auto w-[25.625rem]"
          >
            <div className="flex gap-x-10">
              <FormField
                control={form.control}
                name="imagePath"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <input
                        className="w-12 h-12"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={loading}
                      />
                    </FormControl>
                    {form.formState.errors.imagePath && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.imagePath.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-y-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Enter product title" />
                      </FormControl>
                      {form.formState.errors.title && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.title.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <div className="flex gap-x-5 items-center mb-5">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter product category"
                          />
                        </FormControl>
                        {form.formState.errors.category && (
                          <p className="text-red-500 text-sm">
                            {form.formState.errors.category.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="w-16">
                          <Input {...field} placeholder="Enter product price" />
                        </FormControl>
                        {form.formState.errors.price && (
                          <p className="text-red-500 text-sm">
                            {form.formState.errors.price.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter product description"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="mt-4">Submit</Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
