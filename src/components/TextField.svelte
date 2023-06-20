<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    export let textFieldText: string;

    let value = '';
    let isFocused = false;
    let isValid = true;

    const emptyState =
        'w-602px h-68px font-suisse text-18px text-left bg-transparent border border-gray-600 text-white focus:outline-none transition duration-500 ease-in-out rounded-lg';
    const focusedState =
        'w-602px h-68px font-suisse text-18px text-left bg-transparent border border-purple-500 text-white focus:outline-none transition duration-500 ease-in-out rounded-lg';
    const filledState =
        'w-602px h-68px font-suisse text-18px text-left bg-transparent border border-red-500 text-white focus:outline-none transition duration-500 ease-in-out rounded-lg';

    const isValidWallet = (address) => {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    };

    onMount(() => {
        if (value) isFocused = true;
    });

    function handlePaste() {
        navigator.clipboard.readText().then((clipText) => {
            value = clipText;
            isFocused = true; // Set focus to true after paste
            isValid = isValidWallet(value); // Check if valid after paste
        });
    }

    function handleBlur() {
        isFocused = false;
        isValid = isValidWallet(value);
    }
</script>

<div
    class="relative h-68px w-602px absolute top-213px left-20px p-4 rounded-lg flex items-center gap-273px"
>
    <input
        bind:value
        type="text"
        placeholder={textFieldText}
        on:focus={() => (isFocused = true)}
        on:blur={handleBlur}
        class={value === ''
            ? emptyState
            : isFocused
            ? focusedState
            : isValid
            ? emptyState
            : filledState}
        style="padding: 22.5px 100px 22.5px 20px;"
    />
    <button
        on:click={handlePaste}
        class="text-purple-600 font-semibold text-18px absolute right-10 top-1/2 transform -translate-y-1/2"
        style="font-family: 'Open Sans', sans-serif; height: 25px; width: 48px;"
    >
        Paste
    </button>
    {#if !isFocused && !isValid && value != ''}
        <p
            transition:fade={{ duration: 500 }}
            class="text-red-500 font-suisse text-18px leading-23px absolute bottom-0 transform translate-y-1/2"
        >
            Incorrect wallet format.
        </p>
    {/if}
</div>

<style>
    .border-gray-600 {
        border-color: #545261;
    }
    .border-purple-500 {
        border-color: #7162cf;
    }
    .border-red-500 {
        border-color: #ef4444;
    }
    .h-60px {
        height: 60px;
    }
    .h-100px {
        height: 100px;
    }
    .w-602px {
        width: 602px;
    }
    .top-213px {
        top: 213px;
    }
    .left-20px {
        left: 20px;
    }
    .gap-273px {
        gap: 273px;
    }
    .rounded-lg {
        border-radius: 10px;
    }
    .text-18px {
        font-size: 18px;
    }
    .leading-23px {
        line-height: 23px;
    }
    .text-purple-600 {
        color: #7c3aed;
    }
    * {
        box-sizing: border-box;
    }
</style>
