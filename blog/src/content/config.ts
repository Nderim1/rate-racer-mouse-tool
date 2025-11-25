import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string().default('TestMyRig Team'),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
    }),
});

export const collections = {
    posts: postsCollection,
};
