export type HistoryPayloadSize = number | 'max';

export type ConversationLayout = 'bubbles' | 'list';

export interface ConversationOptions {
    /**
     * Indicates whether the conversation should be scrolled to the bottom when a new message is added.
     *
     * @default true
     */
    autoScroll?: boolean;

    /**
     * Indicates the number of messages from conversation history that should be sent to the backend with each message.
     * For custom adapters, the history will be available as part of `extras.conversationHistory` attribute.
     * For standard adapters, the history will be automatically handled by the adapter.
     *
     * By default, the entire conversation history is sent with each message.
     * Set to `0` to disable sending conversation history with each message.
     * Or set to a positive integer to send a specific number of messages.
     *
     * @default 'max'
     */
    historyPayloadSize?: HistoryPayloadSize;

    /**
     * Indicates how items in the conversation should be displayed.
     *
     * - `list`: Chat items are displayed as a list with the AI responses underneath each user message.
     * - `bubbles`: Items are displayed as chat bubbles with the prompts on the right and the AI messages on the left.
     *
     * @default 'list'
     */
    layout?: ConversationLayout;
}
