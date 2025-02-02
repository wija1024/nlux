import {BaseComp} from '../exports/aiChat/comp/base';
import {CompRegistry} from '../exports/aiChat/comp/registry';
import {getGlobalNlux} from '../exports/global';
import {CompChatItem} from './chat/chatItem/chatItem.model';
import {CompChatRoom} from './chat/chatRoom/chatRoom.model';
import {CompChatSegment} from './chat/chatSegment/chatSegment.model';
import {CompConversation} from './chat/conversation/conversation.model';
import {CompComposer} from './chat/composer/composer.model';
import {CompExceptionsBox} from './miscellaneous/exceptionsBox/model';

const componentsById = () => ({
    'chatRoom': CompChatRoom,
    'exceptionsBox': CompExceptionsBox,
    'conversation': CompConversation,
    'composer': CompComposer,
    'chatSegment': CompChatSegment,
    'chatItem': CompChatItem,
});

export const registerAllComponents = () => {
    const globalNlux = getGlobalNlux();
    const componentsRegistered = btoa('componentsRegistered');
    if (globalNlux && globalNlux[componentsRegistered] === true) {
        return;
    }

    Object.entries(componentsById()).forEach(([, comp]) => {
        CompRegistry.register(comp as typeof BaseComp);
    });

    if (typeof globalNlux === 'object') {
        globalNlux[componentsRegistered] = true;
    }
};
