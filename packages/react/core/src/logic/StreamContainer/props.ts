import {HighlighterExtension} from '@nlux/core';
import {MessageDirection} from '../../../../../shared/src/ui/Message/props';
import {ResponseComponent} from '../../exports/messageOptions';

export type StreamContainerProps<AisMsg> = {
    uid: string,
    direction: MessageDirection,
    status: 'streaming' | 'complete';
    initialMarkdownMessage?: string;
    responseRenderer?: ResponseComponent<AisMsg>;
    markdownOptions?: {
        syntaxHighlighter?: HighlighterExtension;
        markdownLinkTarget?: 'blank' | 'self';
        showCodeBlockCopyButton?: boolean;
        skipStreamingAnimation?: boolean;
        streamingAnimationSpeed?: number;
    }
};

export type StreamContainerImperativeProps<AiMsg> = {
    streamChunk: (chunk: AiMsg) => void;
    completeStream: () => void;
};
