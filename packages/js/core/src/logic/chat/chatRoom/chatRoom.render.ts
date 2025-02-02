import {AnyAiMsg} from '../../../../../../shared/src/types/anyAiMsg';
import {NluxRenderingError} from '../../../../../../shared/src/types/error';
import {render} from '../../../../../../shared/src/utils/dom/render';
import {CompRenderer} from '../../../types/comp';
import {getElement} from '../../../utils/dom/getElement';
import {listenToElement} from '../../../utils/dom/listenToElement';
import {source} from '../../../utils/source';
import {CompChatRoomActions, CompChatRoomElements, CompChatRoomEvents, CompChatRoomProps} from './chatRoom.types';

const __ = (styleName: string) => `nlux-chtRm-${styleName}`;

const html = () => `` +
    `<div class="${__('cnv-cntr')}"></div>` +
    `<div class="${__('prmptBox-cntr')}"></div>` +
    ``;

export const renderChatRoom: CompRenderer<
    CompChatRoomProps<AnyAiMsg>, CompChatRoomElements, CompChatRoomEvents, CompChatRoomActions
> = ({
    appendToRoot,
    compEvent,
    props,
}) => {
    const dom = render(html());
    if (!dom) {
        throw new NluxRenderingError({
            source: source('chatRoom', 'render'),
            message: 'Chat room could not be rendered',
        });
    }

    const visibleProp = props.visible ?? true;
    const chatRoomElement = document.createElement('div');

    chatRoomElement.className = __('cntr');
    chatRoomElement.append(dom);
    chatRoomElement.style.display = visibleProp ? '' : 'none';

    const [conversationElement, removeMessagesContainerListeners] = listenToElement(chatRoomElement,
        `:scope > .${__('cnv-cntr')}`,
    ).on('click', compEvent('segments-container-clicked'))
     .get();

    const composerElement = getElement(chatRoomElement, `:scope > .${__('prmptBox-cntr')}`);
    appendToRoot(chatRoomElement);
    compEvent('chat-room-ready')();

    return {
        elements: {
            chatRoomContainer: chatRoomElement,
            composerContainer: composerElement,
            conversationContainer: conversationElement,
        },
        onDestroy: () => {
            removeMessagesContainerListeners();
        },
    };
};
