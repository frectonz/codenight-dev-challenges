import z from 'zod';

export const validateChallengeMetadata = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

export type ChallengeMetadata = z.output<typeof validateChallengeMetadata>;
export type ChallengeErrors = z.inferFormattedError<typeof validateChallengeMetadata>;
