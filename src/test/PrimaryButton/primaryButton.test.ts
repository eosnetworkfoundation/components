import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';

import type { PrimaryButtonInputs } from '../../lib/types/primaryButton/PrimaryButton';
import PrimaryButton from '../../components/primaryButton/PrimaryButton.svelte';
import Spinner from '../../lib/images/Spinner.svelte';
import CheckMark from '../../lib/images/Vector.svelte';

describe('Primary button', () => {
    afterEach(() => cleanup());

    const exampleOnClickFunction = async () => {
        await setTimeout(() => {
            console.log('pretend to load');
        }, 500);
        return 1 + 1;
    };
    const exampleButtonText = 'Test Button Text';
    const exampleSuccessMessage = 'You did the thing!';
    const buttonProps: PrimaryButtonInputs = {
        buttonText: exampleButtonText,
        clickAction: exampleOnClickFunction,
        isDisabled: false,
        successMessage: exampleSuccessMessage,
    };
    const disabledButtonProps: PrimaryButtonInputs = {
        buttonText: exampleButtonText,
        clickAction: exampleOnClickFunction,
        isDisabled: true,
        successMessage: exampleSuccessMessage,
    };

    const noSuccessButtonProps: PrimaryButtonInputs = {
        buttonText: exampleButtonText,
        clickAction: exampleOnClickFunction,
        isDisabled: false,
    };

    it('renders success message', async () => {
        render(PrimaryButton, { primaryButtonInputs: buttonProps });
        const button = screen.getByRole('button');
        expect(button).toBeDefined();
        expect(button.innerHTML).toBe(exampleButtonText);
        await fireEvent.click(button);
        const spinner = await screen.findAllByTitle('spinner');
        expect(spinner).toBeDefined();
        const checkMark = await screen.getByTitle('checkmark');
        expect(checkMark).toBeDefined();
        expect(button.innerHTML).toContain('You did the thing!');
    });

    it('renders disabled button', async () => {
        render(PrimaryButton, { primaryButtonInputs: disabledButtonProps });
        const button = screen.getByRole('button');
        expect(button).toBeDefined();
        expect(button).toHaveProperty('disabled', true);
        expect(button.innerHTML).toBe(exampleButtonText);
    });

    it('renders no success message', async () => {
        render(PrimaryButton, { primaryButtonInputs: noSuccessButtonProps });
        const button = screen.getByRole('button');
        expect(button).toBeDefined();
        expect(button.innerHTML).toBe(exampleButtonText);
        await fireEvent.click(button);
        const spinner = await screen.findAllByTitle('spinner');
        expect(spinner).toBeDefined();
        expect(button.innerHTML).not.toContain('You did the thing!');
        expect(button.innerHTML).toContain(exampleButtonText);
    });
});
