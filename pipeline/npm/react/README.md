# [NLUX React](https://nlux.dev) 🌲✨💬

![Free And Open Source](https://img.shields.io/badge/Free%20%26%20Open%20Source-1ccb61)
[![Docs nlux.dev](https://img.shields.io/badge/Docs_Website-nlux.dev-fa896b)](https://nlux.dev)

## The Conversational AI UI Library For Any LLM

`NLUX` _(for Natural Language User Experience)_ is an open-source React and Javascript library that makes it super
simple
to
integrate powerful large language models (LLMs) like ChatGPT into your web app or website. With just a few lines
of code, you can add conversational AI capabilities and interact with your favourite LLM.

## Key Features 🌟

* **Build AI Chat Interfaces In Minutes** ― High quality conversational AI interfaces with just a few lines of code.
* **React Components & Hooks** ― `<AiChat />` for UI and `useChatAdapter` hook for easy integration.
* **LLM Adapters** ― For `ChatGPT` / `LangChain` 🦜 LangServe / `HuggingFace` 🤗 Inference.
* A flexible interface to **Create Your Own Adapter** for any LLM or API.
* **Bot and User Personas** ― Customize the bot and user personas with names, images, and more.
* **Streaming LLM Output** ― Stream the chat response to the UI as it's being generated.
* **Customizable Theme** - Easily customize the look and feel of the chat interface using CSS variables.
* **Event Listeners** - Listen to messages, errors, and other events to customize the UI and behaviour.
* **Zero Dependencies** ― Lightweight codebase, with zero-dep except for LLM front-end libraries.

[![200+ Unit Tests](https://github.com/nluxai/nlux/actions/workflows/run-all-tests.yml/badge.svg)](https://github.com/nluxai/nlux/actions/workflows/run-all-tests.yml)

## Docs & Examples 📖

* Developer portal ― [nlux.dev](https://nlux.dev/)
* Examples and live code playgrounds ― [nlux.dev/examples](https://nlux.dev/examples)


* [Standard LLM adapters available](https://nlux.dev/learn/adapters)
* [How to create your own adapter for nlux](https://nlux.dev/learn/adapters/custom-adapters/create-custom-adapter)

## Get Started With `NLUX React` 🚀

The example below demonstrates how to create an AI chat interface using `NLUX React` and `LangChain`, the open source
framework for building LLM backends. But you can use `NLUX` **with any LLM** ― either
via the [standard adapters](https://nlux.dev/learn/adapters) provided, or
by creating [your own adapter](https://nlux.dev/learn/adapters/custom-adapters/create-custom-adapter).

To get started with `NLUX React` and LangChain, install the `@nlux/react` and `@nlux/langchain-react` packages:

```sh
npm install @nlux/react @nlux/langchain-react
```

Then include `<AiChat />` in your React app to get started.<br />
Use the `useChatAdapter` hook to configure an adapter for your LLM.

```jsx
import {AiChat} from '@nlux/react';
import {useChatAdapter} from '@nlux/langchain-react';

const App = () => {
    const gptAdapter = useChatAdapter({
        url: 'https://<Your LangServe Runnable URL>'
    });

    return (
        <AiChat
            adapter={gptAdapter}
            composerOptions={{
                placeholder: 'How can I help you today?'
            }}
            conversationOptions={{
                historyPayloadSize: 'max'
            }}
        />
    );
}
```

You should also [include the NLUX theme CSS file](#theme-file-and-css-) in your HTML page
or import it in your React app.

## And The Result Is ✨

An AI chatbot, powered by LangChain, that can understand and respond to user messages:

[![NLUX AiChat Component](https://nlux.dev/images/demos/chat-convo-demo-fin-advisor.gif)](https://nlux.dev)

## Theme File and CSS 🎨

You should include a **theme CSS file** into your HTML page.<br />
The recommended way for React developers is to install `@nlux/themes`

```sh
npm install @nlux/themes
```

Then import the theme CSS file into your app or component as follows:

```jsx
import '@nlux/themes/luna.css';
```

This requires that your bundler is configured to load CSS files.