const { z } = require('zod');
const { validateBody, validateQuery } = require('../../../utils/validation');

const statusEnum = z.enum(['draft', 'live', 'archived']);
const difficultyEnum = z.enum(['easy', 'medium', 'hard']);
const typeEnum = z.enum(['free', 'premium']);

const slugSchema = z
  .string()
  .max(80)
  .trim()
  .optional()
  .transform((v) => (v === '' ? undefined : v));

const createChallengeSchema = z.object({
  slug: slugSchema,
  status: statusEnum.optional().default('draft'),
  name: z.string().min(1).max(60).trim(),
  description: z.string().min(1).max(200).trim(),
  difficulty: difficultyEnum,
  timeAllowed: z.number().int().min(1),
  type: typeEnum.optional().default('free'),
  thumbnailUrl: z.string().optional().default(''),
  tags: z.array(z.string()).optional().default([]),
  compulsoryFeatures: z.array(z.string()).optional().default([]),
  niceToHaveFeatures: z.array(z.string()).optional().default([]),
  templatePath: z.string().min(1).trim(),
  aiPromptPath: z.string().min(1).trim(),
  scoringConfigPath: z.string().min(1).trim(),
  testPath: z.string().min(1).trim(),
  version: z.number().int().optional().default(1),
});

const updateChallengeSchema = createChallengeSchema.partial();

const listChallengesQuerySchema = z.object({
  status: statusEnum.optional(),
  difficulty: difficultyEnum.optional(),
  type: typeEnum.optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  skip: z.coerce.number().int().min(0).optional().default(0),
});

const createChallengeValidation = validateBody(createChallengeSchema);
const updateChallengeValidation = validateBody(updateChallengeSchema);
const listChallengesQueryValidation = validateQuery(listChallengesQuerySchema);

module.exports = {
  createChallengeValidation,
  updateChallengeValidation,
  listChallengesQueryValidation,
};
