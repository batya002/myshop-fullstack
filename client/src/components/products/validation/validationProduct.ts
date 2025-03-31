import * as yup from "yup"

export const validationProduct = yup.object({
	imagePath: yup.string().required("Image is required"),
	title: yup.string().required("Title is required").max(20),
	category: yup.string().required("Category is required").max(24),
	price: yup.number().required("Price is required"),
	description: yup.string().required("Description is required").min(50).max(150)
})