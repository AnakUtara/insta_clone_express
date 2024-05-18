export function validateOrThrow(condition: boolean, errorMessage: string) {
	if (condition) throw new Error(errorMessage);
}

export function throwError(error: unknown) {
	if (error instanceof Error) throw new Error(error.message);
}
