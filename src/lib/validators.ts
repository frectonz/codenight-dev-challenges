import z from 'zod';

export const validateChallengeMetadata = z.object({
	title: z.string().min(5),
	description: z.string().min(10),
	difficulty: z.enum(['easy', 'medium', 'hard'])
});

export type ChallengeMetadata = z.output<typeof validateChallengeMetadata>;
export type ChallengeErrors = z.inferFormattedError<typeof validateChallengeMetadata>;

export const validateUser = z.object({
	email: z.string().email(),
	name: z.string(),
	photoURL: z.string().url()
});
export type UserData = z.output<typeof validateUser>;

export const validateChallenge = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	difficulty: z.enum(['easy', 'medium', 'hard']),
	image: z.string().url(),
	createdBy: validateUser
});
export type ChallengeData = z.output<typeof validateChallenge>;
