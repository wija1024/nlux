export default (colorScheme: 'dark' | 'light') => `import {AiChat} from '@nlux/react';
import '@nlux/themes/nova.css';
import {streamAdapter} from './adapter';
import {user, botPictureUrl} from './personas';

export default () => (
  <AiChat
    adapter={streamAdapter}
    personaOptions={{
      bot: {
        name: 'EinBot',
        tagline: 'Your Genius AI Assistant',
        picture: botPictureUrl,
      },
      user
    }}
    composerOptions={{
      placeholder: 'How can I help you?'
    }}
    displayOptions={{
      height: 350, maxWidth: 430,
      colorScheme: '${colorScheme}'
    }}
  />
);`;
