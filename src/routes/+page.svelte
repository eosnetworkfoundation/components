<script lang="ts">
    import PrimaryButton from '../components/primaryButton/PrimaryButton.svelte';
    import type { PrimaryButtonInputs } from '../lib/types/primaryButton/PrimaryButton';

    // example button use
    function testFunction() {
        console.log('Hello World!');
    }

    const buttonInputs: PrimaryButtonInputs = {
        buttonText: 'Receive 1 EOS',
        clickAction: testFunction,
        isDisabled: false,
        successMessage: '1 EOS Sent!',
    };
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <div class="m-2">
        <PrimaryButton primaryButtonInputs={buttonInputs} />
    </div>
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.green.800);
    }
</style>
