import { Status } from "@prisma/client";

export type TPost = {
	id?: number;
	image: string;
	caption: string;
	user_id: string;
	status: Status;
	created_at?: Date;
	updated_at?: Date;
};

export type TUserPost = {
	username: string;
	post: {
		created_at: Date;
		image: string;
		caption: string;
		status: Status;
		updated_at: Date;
	}[];
};
