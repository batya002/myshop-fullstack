import axios from "axios";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormProduct } from "../interface/productForm";

export const useImageUpload = (setValue: UseFormSetValue<FormProduct>) => {
	const [loading, setLoading] = useState<boolean>(false);

	const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "images");

		try {
			setLoading(true);
			const response = await axios.post(
				"https://api.cloudinary.com/v1_1/dl63nkkew/image/upload",
				formData
			);
			const imageUrl = response.data.secure_url;
			setValue("imagePath", imageUrl);
		} catch (error) {
			console.error("Ошибка загрузки изображения:", error);
		} finally {
			setLoading(false);
		}
	};

	return { handleImageChange, loading };
};
