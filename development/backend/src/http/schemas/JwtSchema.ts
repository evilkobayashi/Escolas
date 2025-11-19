import { z } from "zod";

const verifyJwtSchema = z.object({
    accessToken: z.string(),
});

export { verifyJwtSchema };
