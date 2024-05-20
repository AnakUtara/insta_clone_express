import Joi from "joi";

export const registerSchema = Joi.object({
	username: Joi.string()
		.alphanum()
		.lowercase()
		.min(3)
		.max(30)
		.trim()
		.required(),
	fullname: Joi.string().trim().required(),
	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
		.trim()
		.required(),
	email: Joi.string()
		.trim()
		.lowercase()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.required(),
});

export const postSchema = Joi.object({
	caption: Joi.string().max(1000).trim().required(),
});
