import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    if (locals.pb.authStore.isValid) {
        return redirect(301, "/admin");
    }

    return {};
}

export const actions = {
    login: async ({ locals, request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            throw new Error('Email and password are required');
        }

        await locals.pb.collection('users').authWithPassword(email, password);

        redirect(301, '/admin');
        return {};
    }
}