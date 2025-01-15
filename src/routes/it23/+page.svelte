<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import * as Dialog from '$lib/components/ui/dialog';
    import { formatDistance } from 'date-fns';
    import PocketBase, { type RecordModel } from 'pocketbase';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { onMount } from 'svelte';

    const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
    let blogs: RecordModel[] = $state([]);

    async function fetchBlogs() {
        try {
            const records = await pb.collection('it23').getList(1, 50, {
                filter: 'public = true',
                sort: '-created',
                expand: 'user'
            });
            blogs = records.items;
        } catch (err) {
            console.error('Error fetching blogs:', err);
        }
    }

    onMount(() => {
        fetchBlogs();
    });
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Interview Blogs</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each blogs as blog}
            <Card.Root class="overflow-hidden hover:shadow-lg transition-shadow font-noto-sans-thai">
                {#if blog.cover}
                    <img
                        src={`${pb.baseURL}/api/files/it23/${blog.id}/${blog.cover}`}
                        alt={blog.title}
                        class="w-full h-48 object-cover"
                    />
                {/if}
                
                <Card.Header>
                    <Card.Title class="">{blog.title}</Card.Title>
                    <Card.Description>
                        <div class="flex items-center gap-2 mt-2">
                            <span>{blog.expand?.user.email}</span>
                        </div>
                    </Card.Description>
                </Card.Header>
                
                <Card.Content>
                    <p class="text-sm text-gray-600">
                        {blog.desc}
                    </p>
                </Card.Content>
                
                <Card.Footer class="flex justify-between items-center">
                    <Badge variant="secondary">
                        {formatDistance(new Date(blog.created), new Date(), { addSuffix: true })}
                    </Badge>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <a
                                href="#top"
                                class="text-primary hover:underline"
                            >
                                Read more
                            </a>
                        </Dialog.Trigger>
                        <Dialog.Content class="min-w-[90vw] min-h-[70vh]">
                            <div class="text-sm text-gray-600">
                                {@html blog.content}
                            </div>
                        </Dialog.Content>
                    </Dialog.Root>
                </Card.Footer>
            </Card.Root>
        {/each}
    </div>
</div>