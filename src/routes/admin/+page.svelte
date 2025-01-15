<script lang="ts">
    import PocketBase, { type RecordModel } from 'pocketbase';
    import * as Table from "$lib/components/ui/table";
    import * as Card from "$lib/components/ui/card";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from '$lib/components/ui/input';
    import { Textarea } from "$lib/components/ui/textarea";
    import { Switch } from '$lib/components/ui/switch';
    import { Button } from "$lib/components/ui/button";
    import { Plus, Pencil, Trash2 } from 'lucide-svelte';
    import { onMount } from 'svelte';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import Label from '$lib/components/ui/label/label.svelte';
	import { enhance } from '$app/forms';

    const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
    const { data } = $props();
    let posts: RecordModel[] = $state([]);
    let loading = $state(true);

    async function loadPosts() {
        try {
            posts = data.posts || [];
        } catch (err) {
            console.error('Error loading posts:', err);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        loadPosts();
    });
</script>

<div class="container mx-auto p-6">
    <Card.Root class="mb-6">
        <Card.Header>
            <Card.Title class="text-2xl">Blog Posts Management</Card.Title>
            <Card.Description>Manage your interview blog posts</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="mb-4">
                <Dialog.Root>
                    <Dialog.Trigger>
                        <Button>
                            <Plus class="mr-2 h-4 w-4" />
                            New Post
                        </Button>
                    </Dialog.Trigger>
                    <Dialog.Content class="min-w-[90vw] min-h-[70vh]">
                        <form action="?/createPost" method="POST">
                            <div class="text-sm text-gray-600 space-y-4">
                                <Input type="text" name="title" class="w-full" placeholder="Title" />
                                <Input type="file" name="cover" class="w-full mt-2" placeholder="Cover URL" accept="image/*" />
                                <Label for="public">Public</Label>
                                <Switch id="public" name="public" class="mr-2" />
                                <Textarea name="content" class="w-full min-h-96" placeholder="Content" />
                                <Button type="submit" class="mt-4">Create</Button>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Root>
            </div>

            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.Head>Cover</Table.Head>
                        <Table.Head>Author</Table.Head>
                        <Table.Head>Status</Table.Head>
                        <Table.Head>Created</Table.Head>
                        <Table.Head class="text-right">Title</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#if loading}
                        <Table.Row>
                            <Table.Cell colspan={5} class="text-center">Loading...</Table.Cell>
                        </Table.Row>
                    {:else}
                        {#each posts as post}
                            <Table.Row>
                                <Table.Cell>
                                    <img 
                                        src={pb.files.getURL(post, post.cover)} 
                                        alt="Cover" 
                                        class="h-10 w-10 object-cover rounded"
                                    />
                                </Table.Cell>
                                <Table.Cell>{post.expand?.user?.email || 'Unknown'}</Table.Cell>
                                <Table.Cell>
                                    <span class={post.public ? 'text-green-600' : 'text-yellow-600'}>
                                        {post.public ? 'Public' : 'Draft'}
                                    </span>
                                </Table.Cell>
                                <Table.Cell>{new Date(post.created).toLocaleDateString()}</Table.Cell>
                                <Table.Cell class="text-right">
                                    <Dialog.Root>
                                        <Dialog.Trigger>
                                            <Button variant="ghost" size="icon" href="#top">
                                                <Pencil class="h-4 w-4" />
                                            </Button>
                                        </Dialog.Trigger>
                                        <Dialog.Content class="min-w-[90vw] min-h-[70vh]">
                                            <form action="?/updatePost" method="POST">
                                                <div class="text-sm text-gray-600">
                                                    <Input type="hidden" name="id" value={post.id} />
                                                    <Textarea name="content" class="w-full min-h-96" value={post.content} />
                                                    <Button type="submit" class="mt-4">Update</Button>
                                                </div>
                                            </form>
                                        </Dialog.Content>
                                    </Dialog.Root>
                                    <form action="?/deletePost" method="POST">
                                        <Input type="hidden" name="id" value={post.id} />
                                        <Button type="submit" variant="ghost" size="icon">
                                            <Trash2 class="h-4 w-4" />
                                        </Button>
                                    </form>
                                </Table.Cell>
                            </Table.Row>
                        {/each}
                    {/if}
                </Table.Body>
            </Table.Root>
        </Card.Content>
    </Card.Root>
</div>