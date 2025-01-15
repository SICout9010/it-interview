<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!(document as any).startViewTransition) return;

		return new Promise((resolve) => {
			(document as any).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		})
	})
</script>

{@render children()}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans+Thai:wght@100..900&display=swap');
	::view-transition-group(root) {
    pointer-events: none;
    animation-timing-function: var(--expo-in);
	background-color: #2F99FD;
    }

    ::view-transition-new(root) {
    mask: url('/it_logo.png') center / 0 no-repeat;
    animation: scale 1s;
    }

    ::view-transition-old(root)
    .dark::view-transition-old(root) {
    animation: scale 0.5s;
    }

    @keyframes scale {
    0% {
        mask-size: 0;
    }
    10% {
        mask-size: 50vmax;
    }
    90% {
        mask-size: 50vmax;
    }
    100% {
        mask-size: 2000vmax;
    }
    }
</style>