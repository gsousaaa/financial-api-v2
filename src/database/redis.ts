import { createClient } from "@redis/client";

export const client = createClient({
     url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
})

