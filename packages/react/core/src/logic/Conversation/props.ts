import {ConversationLayout, ConversationOptions, HighlighterExtension} from '@nlux/core';
import {ReactElement} from 'react';
import {ChatSegment} from '../../../../../shared/src/types/chatSegment/chatSegment';
import {ResponseComponent} from '../../exports/messageOptions';
import {PersonaOptions} from '../../exports/personaOptions';

export type ConversationCompProps<AiMsg> = {
    segments: ChatSegment<AiMsg>[];
    conversationOptions?: ConversationOptions;
    personaOptions?: PersonaOptions;
    layout: ConversationLayout;
    responseRenderer?: ResponseComponent<AiMsg>;
    syntaxHighlighter?: HighlighterExtension;
    markdownLinkTarget?: 'blank' | 'self';
    showCodeBlockCopyButton?: boolean;
    skipStreamingAnimation?: boolean;
    streamingAnimationSpeed?: number;
    loader?: ReactElement;
    onLastActiveSegmentChange?: (data: {
        uid: string;
        div: HTMLDivElement;
    } | undefined) => void;
};

export type ImperativeConversationCompProps<AiMsg> = {
    streamChunk: (segmentId: string, messageId: string, chunk: AiMsg) => void;
    completeStream: (segmentId: string, messageId: string) => void;
};
