import {useColorMode} from '@docusaurus/theme-common';
import { useMemo } from 'react';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackPreview,
    SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { SandpackFiles } from '@codesandbox/sandpack-react';

import indexHtmlContent from './indexHtml';
import indexTsxContent from './indexTsx';
import simulatorTsContent from './simulatorJs';

export type CodeEditorProps = {
    className?: string;
    simulatedPrompt?: string;
    editorHeight?: number;
    direction?: 'row' | 'column';
    files: Record<string, string | ((colorScheme: 'light' | 'dark') => string)>;
}

export const CodeEditor = ({
    className,
    simulatedPrompt,
    editorHeight = 420,
    files,
    direction = 'column',
}: CodeEditorProps) => {
    const { colorMode } = useColorMode();
    const setPromptIntoSimulator = useMemo(() => {
        const promptToType = simulatedPrompt || 'How can AI chatbots improve the user experience on my website?';
        return `setTimeout(() => { nluxSimulator?.enableSimulator();\n nluxSimulator?.setPrompt("${promptToType}"); }, 1000);\n`;
    }, [simulatedPrompt]);

    const uid = useMemo(() => Math.random().toString(36).substring(7), [colorMode]);
    const filesContent: SandpackFiles = {};

    for (const [key, value] of Object.entries(files)) {
        filesContent[key] = typeof value === 'function' ? value(colorMode) : value;
    }

    return (
        <SandpackProvider
            key={uid}
            className={className}
            template="react-ts"
            theme={colorMode}
            options={{
                recompileDelay: 250,
                visibleFiles: Object.keys(files) as Array<any>,
                initMode: 'lazy',
            }}
            customSetup={{
                dependencies: {
                    "react": "^18.3.1",
                    "react-dom": "^18.3.1",
                    "@nlux/react": "beta",
                    "@nlux/langchain-react": "beta",
                    "@nlux/themes": "beta",
                    "@nlux/highlighter": "beta",
                },
            }}
            files={{
                ...filesContent,
                'public/index.html': indexHtmlContent(colorMode),
                'index.tsx': indexTsxContent,
                'simulator.ts': `${simulatorTsContent}\n${setPromptIntoSimulator}`,
            }}
        >
            <SandpackLayout style={{
                flexDirection: direction,
                height: direction === 'row' ? 'auto' : editorHeight * 2,
            }}>
                <SandpackPreview
                    style={{ height: editorHeight }}
                    showNavigator={false}
                    showOpenInCodeSandbox={true}
                    showRefreshButton={true}
                    showRestartButton={true}
                />
                <SandpackCodeEditor
                    style={{ height: editorHeight }}
                    showTabs
                    showLineNumbers={true}
                    showInlineErrors
                    wrapContent
                    closableTabs={false}
                />
            </SandpackLayout>
        </SandpackProvider>
    )
};
