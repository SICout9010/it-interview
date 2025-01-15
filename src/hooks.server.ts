import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { serializeNonPOJOs } from '$lib/utils';

export const handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL)
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        if (event.locals.pb.authStore.isValid) {
            await event.locals.pb.collection('users').authRefresh();
            event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.record);
        }
    } catch (_) {
        event.locals.pb.authStore.clear();       
        event.locals.user = null;     
    }

    const response = await resolve(event);
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({secure: false, sameSite: 'lax'}));

    return response;
}