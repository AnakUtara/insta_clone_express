import { Gender } from "@prisma/client";

export type TUser = {
	id?: number;
	username: string;
	password: string;
	email: string;
	created_at?: Date;
};

export type TProfile = {
	id?: number | null;
	first_name?: string | null;
	last_name?: string | null;
	bio?: string | null;
	gender?: Gender | null;
	date_of_birth?: Date | null;
	phone_number?: string | null;
	avatar?: string | null;
	updated_at?: Date;
};
