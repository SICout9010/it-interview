<script lang="ts">
    import PocketBase from 'pocketbase';
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { goto } from "$app/navigation";
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

    const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
    let email = "";
    let password = "";
    let isLoading = false;

    async function handleLogin() {
        if (!email || !password) {
            return;
        }

        try {
            isLoading = true;
            goto("/admin");
        } catch (error) {
            console.error('Error logging in:', error);
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="flex h-screen items-center justify-center">
    <Card.Root class="w-[350px]">
        <Card.Header>
            <Card.Title>Login</Card.Title>
            <Card.Description>
                Enter your credentials to access your account
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <form action="?/login" method="POST" class="space-y-4">
                <div class="space-y-2">
                    <label for="email">Email</label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        bind:value={email}
                        required
                    />
                </div>
                <div class="space-y-2">
                    <label for="password">Password</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        bind:value={password}
                        required
                    />
                </div>
                <Button type="submit" class="w-full" disabled={isLoading}>
                    {#if isLoading}
                        Loading...
                    {:else}
                        Login
                    {/if}
                </Button>
            </form>
        </Card.Content>
    </Card.Root>
</div>