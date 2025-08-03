import { z } from 'zod';
export const ScenarioIn = z.object({ name: z.string(), params: z.record(z.any()) });
