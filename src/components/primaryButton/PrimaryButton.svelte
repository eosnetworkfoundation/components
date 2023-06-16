<script lang="ts">
    import type { PrimaryButtonInputs } from '../../lib/types/primaryButton/PrimaryButton';
    import Spinner from '../../lib/images/Spinner.svelte';
    import CheckMark from '../../lib/images/Vector.svelte';
    export let primaryButtonInputs: PrimaryButtonInputs;
    let isLoading = false;
    let isSuccess = false;

    const { buttonText, clickAction, isDisabled, successMessage } = primaryButtonInputs;
    const defaultStyle =
        'h-12 w-full max-w-md text-white rounded-lg text-lg font-bold bg-violet-600 hover:bg-violet-500 active:bg-violet-950 after:bg-green-500 disabled:bg-zinc-600 disabled:text-opacity-50';
    const successStyle =
        'h-12 w-full max-w-md font-bold text-white rounded-lg bg-green-500 flex justify-center items-center';

    const onClick = async () => {
        isLoading = true;
        try {
            await clickAction();
            isLoading = false;
            isSuccess = true;

            await setTimeout(() => {
                isSuccess = false;
            }, 3000);
        } catch (err) {
            isLoading = false;
            console.error(err);
        }
    };
</script>

<button
    on:click={onClick}
    disabled={isDisabled}
    class={isSuccess && successMessage ? successStyle : defaultStyle}
>
    {#if isLoading}
        <Spinner />
    {:else if !isLoading && isSuccess && successMessage}
        <div class="mr-4">
            <CheckMark />
        </div>
        {successMessage}
    {:else}
        {buttonText}
    {/if}
</button>
