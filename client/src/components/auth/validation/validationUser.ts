import * as yup from "yup";

export const validationUser = yup
	.object({
		name: yup.string().required("Name is required").min(3).max(20),
		email: yup
			.string()
			.required("Email is required")
			.email("Enter a valid email address"),
		password: yup.string().required("Password is required").min(8).max(16),
	})
	.required();
