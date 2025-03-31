import emailjs from "@emailjs/browser";

export const sendConfirmationCode = async (email: string) => {
	const code = Math.floor(100000 + Math.random() * 900000);
	console.log("Generated Code:", code);

	try {
		const response = await emailjs.send(
			"service_hgep7sa",
			"template_sb28f9q",
			{ email, code },
			"nqIeTvWbhPQTYRdZI"
		);

		console.log('Email sent successfully:', response);
		return code;
	} catch (error) {
		console.error("Error sending confirmation email:", error);
		return null;
	}
};
