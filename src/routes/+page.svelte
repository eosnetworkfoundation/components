<script>
    import TextField from '../components/TextField.svelte';
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <TextField textFieldText="Enter Recipient Address or EOS Account" />
</div>

<style lang="postcss">
    :global(html) {
        background-color: #1e1e1e;
    }
</style>
