import { Gender } from "@prisma/client";

export type TUser = {
	id?: string;
	username: string;
	password?: string;
	email: string;
	fullname: string;
	bio?: string | null;
	gender?: Gender | null;
	date_of_birth?: Date | null;
	phone_number?: string | null;
	avatar?: string | null;
	updated_at?: Date;
	created_at?: Date;
};
