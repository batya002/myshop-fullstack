import * as yup from "yup";

const validationUser = yup
	.object({
		name: yup
			.string()
			.required("Name is required").min(3).max(20),
		email: yup
			.string()
			.required("Email is required")
			.email("Enter a valid email address"),
		password: yup
			.string()
			.required("Password is required").min(8).max(16),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password")], "Passwords must match")
			.required("Confirm Password is required"),
	})
	.required();

export const validationSignIn = validationUser.pick(["name", "password", "confirmPassword"])
export const validationSignUp = validationUser.pick(["name", "email", "password"]);