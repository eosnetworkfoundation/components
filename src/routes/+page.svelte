<script lang="ts">
    import PrimaryButton from '../components/primaryButton/PrimaryButton.svelte';
    import type { PrimaryButtonInputs } from '../lib/types/primaryButton/PrimaryButton';
    import TextField from '../components/TextField.svelte';

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
    <TextField
        textFieldText="Enter Recipient Address or EOS Account"
        validator={(val) => /^0x[a-fA-F0-9]{40}$/.test(val) || /^[a-zA-Z0-9]+$/.test(val)}
        errorText="Incorrect wallet format."
    />
    <div class="m-2">
        <PrimaryButton primaryButtonInputs={buttonInputs} />
    </div>
</div>

<style lang="postcss">
    :global(html) {
        background-color: #1e1e1e;
    }
</style>
