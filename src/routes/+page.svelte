<script lang="ts">
	import { onMount } from "svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import Scrollbar from 'smooth-scrollbar';

    onMount(() => {

        gsap.registerPlugin(ScrollTrigger);

        const scroller = document.body;
        const smoothScroll = Scrollbar.init(scroller, {
            damping: 0.1,
            delegateTo: document,
            alwaysShowTracks: true,
        });

        ScrollTrigger.scrollerProxy(scroller, {
            scrollTop(value) {
                if (arguments.length) {
                    smoothScroll.scrollTop = value ?? 0;
                }
                return smoothScroll.scrollTop;
            }
        });
        smoothScroll.addListener(ScrollTrigger.update);

        ScrollTrigger.defaults({ scroller: scroller, pinType: 'transform' });

        const timeline = gsap.timeline({
            defaults: {
                ease: 'power2.inOut',
            }
        });

        timeline.from('.banner', {
            opacity: 0,
            duration: 1,
        });
        timeline.from('.terms', {
            opacity: 0,
            duration: 1,
        })
        gsap.from('.button', {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1,
        });

    });
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
    <div class="flex flex-col items-center justify-center h-full space-y-4">
        <Badge class="text-primary-foreground font-inter">2025 - IT23</Badge>
        <h1 class="banner text-5xl font-monserrat font-bold mb-8">Interview Reviews - Information Technology</h1>
        <div class="flex items-center justify-center gap-8 font-inter">
            <Button href="/it23" class="button rounded-full min-w-44">Experience - IT23</Button>
            <Button class="button rounded-full min-w-44">Perparation</Button>
            <Button class="button rounded-full min-w-44">About us</Button>
        </div>
        <Button class="terms text-primary-foreground opacity-85 rounded-full font-inter" variant='ghost'>Terms of Service</Button>
    </div>
</div>