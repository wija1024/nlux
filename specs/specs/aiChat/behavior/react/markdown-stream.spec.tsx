import {AiChat} from '@nlux-dev/react/src';
import {render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {act} from 'react';
import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import {adapterBuilder} from '../../../../utils/adapterBuilder';
import {AdapterController} from '../../../../utils/adapters';
import {waitForMdStreamToComplete, waitForReactRenderCycle} from '../../../../utils/wait';

describe('<AiChat /> + stream adapter + markdown', () => {
    let adapterController: AdapterController | undefined;

    beforeEach(() => {
        adapterController = adapterBuilder()
            .withFetchText(false)
            .withStreamText(true)
            .create();
    });

    afterEach(() => {
        adapterController = undefined;
    });

    describe('When markdown is being streamed', () => {
        it('Should be rendered correctly', async () => {
            // Arrange
            const aiChat = <AiChat adapter={adapterController!.adapter}/>;
            const {container} = render(aiChat);
            await waitForReactRenderCycle();

            const textArea: HTMLTextAreaElement = container.querySelector('.nlux-comp-prmptBox > textarea')!;
            await userEvent.type(textArea, 'Hello{enter}');
            await waitForReactRenderCycle();

            // Act
            await act(async () => {
                adapterController!.next('**Hello');
                adapterController!.next(' Human!**');
                await waitForMdStreamToComplete();
            });

            // Assert
            const markdownContainer = container.querySelector('.nlux-md-cntr');
            expect(markdownContainer).toBeInTheDocument();

            await waitFor(() => {
                expect(markdownContainer!.innerHTML).toBe('<p><strong>Hello Human!</strong></p>');
            });
        });
    });
});
