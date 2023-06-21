<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import Checkmark from '../lib/images/Checkmark.svelte';
    import Warning from '../lib/images/Warning.svelte';

    export let textFieldText: string;
    export let validator: (val: string) => boolean = () => true;
    export let errorText = 'Error';

    let value = '';
    let isFocused = false;
    let isValid = true;

    const emptyState = 
        'w-full h-68px font-suisse text-18px text-left bg-transparent border border-gray-600 text-white focus:outline-none transition duration-500 ease-in-out rounded-lg';
    const focusedState =
        'w-full h-68px font-suisse text-18px text-left bg-transparent border border-purple-500 text-white focus:outline-none transition duration-500 ease-in-out rounded-lg';
    const filledState =
        'w-full h-68px font-suisse text-18px text-left bg-transparent border border-red-500 text-white focus:outline-none transition duration-500 ease-in-out rounded-lg';

    onMount(() => {
        if (value) isFocused = true;
    });

    let showCheckmark = false;
    let showWarning = false;

    $: {
        handleBlur();
        showCheckmark = !isFocused && isValid && value != '';
        showWarning = !isFocused && !isValid && value != '';
    }

    function handlePaste() {
        navigator.clipboard.readText().then((clipText) => {
            value = clipText;
            isFocused = false;
            isValid = validator(value);
        });
    }

    function handleBlur() {
        isFocused = false;
        isValid = validator(value);
    }

    $: handleState = () => {
        if (value === '') {
            return emptyState;
        } 

        if (isFocused) {
            return focusedState;
        }
        return isValid ? emptyState : filledState;
    }

</script>

<div class="relative h-68px w-602px absolute top-52 left-5 p-4 rounded-lg flex items-center">
    <input
        bind:value
        type="text"
        placeholder={textFieldText}
        on:focus={() => (isFocused = true)}
        on:blur={handleBlur}
        class={handleState()}
        style="padding: 22.5px 100px 22.5px 20px;"
    />
    <div class="absolute right-10 top-1/2 transform -translate-y-1/2">
        {#if showCheckmark}
            <Checkmark />
        {:else if showWarning}
            <Warning />
        {:else}
            <button
                on:click={handlePaste}
                class="text-purple-600 font-semibold text-18px"
                style="font-family: 'Open Sans', sans-serif; height: 25px; width: 48px;"
            >
                Paste
            </button>
        {/if}
    </div>
    {#if showWarning}
        <p
            transition:fade={{ duration: 500 }}
            class="text-red-500 font-suisse text-18px leading-6 absolute bottom-0 transform translate-y-1/2"
        >
            {errorText}
        </p>
    {/if}
</div>

<style>
    .w-602px {
        width: 602px;
    }
    .text-18px {
        font-size: 18px;
    }
    .w-full {
        width: 100%;
    }
    * {
        box-sizing: border-box;
    }
</style>
