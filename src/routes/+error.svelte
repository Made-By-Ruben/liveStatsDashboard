<script lang="ts">
	import { page } from '$app/state';
	import Heading from '$lib/components/ui/Heading.svelte';
	import Hyperlink from '$lib/components/ui/Hyperlink.svelte';
	import Notice from '$lib/components/ui/Notice.svelte';
</script>

<div
	class="flex flex-col gap-5 min-h-screen w-full items-center justify-center bg-brand-primary-3 px-4 py-10 text-brand-off-white"
>
	<Heading title={"Oops, something went wrong"} body={`${page.status}: ${page.error?.message}`} />

    <Notice message={"Please check your submitted matchID and try again"} />
    
    <Hyperlink buttonText={"Try again"} endpoint={"/"} />
</div>
