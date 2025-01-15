import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    if (!locals.pb.authStore.isValid) {
        return redirect(301, "/auth");
    }

    const posts = await locals.pb.collection('it23').getFullList(1, {
        filter: `user = "${locals.user?.id}"`,
        expand: 'user',
    }).catch(() => null);

    return {
        posts
    };
}

export const actions = {
    createPost: async ({ locals, request }) => {
        const formData = await request.formData();
        const title = formData.get('title');
        const cover = formData.get('cover') as File;
        const content = formData.get('content');
        const isPublic = formData.get('public') === 'on';

        if (!content || typeof content !== 'string') {
            throw new Error('content are required');
        }

        const post = await locals.pb.collection('it23').create({
            user: locals.user?.id,
            title: title || '',
            content,
            public: isPublic,
        });

        const imageFormData = new FormData();
        imageFormData.append('cover', cover);
        await locals.pb.collection('it23').update(post.id, imageFormData);

        return {};
    },
    updatePost: async ({ locals, request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const content = formData.get('content');

        if (!id || !content || typeof content !== 'string' || typeof id !== 'string') {
            throw new Error('content are required');
        }

        await locals.pb.collection('it23').update(id, {
            content,
        });

        return {};
    },
    deletePost: async ({ locals, request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        if (!id || typeof id !== 'string') {
            throw new Error('id are required');
        }

        await locals.pb.collection('it23').delete(id);

        return {};
    },
}