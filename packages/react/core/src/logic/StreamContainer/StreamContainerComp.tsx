import {FC, ReactElement, Ref, RefObject, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import {createMarkdownStreamParser, MarkdownStreamParser} from '../../../../../extra/markdown/src';
import {className as compMessageClassName} from '../../../../../shared/src/ui/Message/create';
import {
    directionClassName as compMessageDirectionClassName,
} from '../../../../../shared/src/ui/Message/utils/applyNewDirectionClassName';
import {
    statusClassName as compMessageStatusClassName,
} from '../../../../../shared/src/ui/Message/utils/applyNewStatusClassName';
import {warn} from '../../../../../shared/src/utils/warn';
import {StreamResponseComponentProps} from '../../exports/messageOptions';
import {StreamContainerImperativeProps, StreamContainerProps} from './props';
import {streamingDomService} from './streamingDomService';

export const StreamContainerComp = function <AiMsg>(
    props: StreamContainerProps<AiMsg>,
    ref: Ref<StreamContainerImperativeProps<AiMsg>>,
) {
    const {
        uid,
        status,
        responseRenderer,
        markdownOptions,
        initialMarkdownMessage,
    } = props;

    // We use references in this component to avoid re-renders — as streaming happens outside of React
    // rendering cycle, we don't want to trigger re-renders on every chunk of data received.
    const rootElRef = useRef<HTMLDivElement | null>(null);
    const rootElRefPreviousValue = useRef<HTMLDivElement | null>(null);
    const mdStreamParserRef = useRef<MarkdownStreamParser | null>(null);

    const [streamContainer, setStreamContainer] = useState<HTMLDivElement>();
    const [initialMarkdownMessageParsed, setInitialMarkdownMessageParsed] = useState(false);

    useEffect(() => {
        if (rootElRef.current !== rootElRefPreviousValue.current) {
            rootElRefPreviousValue.current = rootElRef.current;
            setStreamContainer(rootElRef.current || undefined);
        }
    }); // No dependencies, this effect should run on every render.
    // The 'if' statement inside the effect plays a similar role to a useEffect dependency array
    // to prevent setting the streamContainer state to the same value multiple times.

    useEffect(() => {
        if (streamContainer) {
            const element = streamingDomService.getStreamingDomElement(uid);
            streamContainer.append(element);
        }
    }, [streamContainer]);

    // We update the stream parser when key options (markdownLinkTarget, syntaxHighlighter) change.
    useEffect(() => {
        const element = streamingDomService.getStreamingDomElement(uid);
        mdStreamParserRef.current = createMarkdownStreamParser(element, {
            syntaxHighlighter: markdownOptions?.syntaxHighlighter,
            markdownLinkTarget: markdownOptions?.markdownLinkTarget,
            showCodeBlockCopyButton: markdownOptions?.showCodeBlockCopyButton,
            skipStreamingAnimation: markdownOptions?.skipStreamingAnimation,
            streamingAnimationSpeed: markdownOptions?.streamingAnimationSpeed,
        });

        if (!initialMarkdownMessageParsed && initialMarkdownMessage) {
            mdStreamParserRef.current.next(initialMarkdownMessage);
            setInitialMarkdownMessageParsed(true);
        }

        return () => {
            // Technical — The DOM element will be re-used if the same message (with the same UID) is re-rendered
            // in the chat segment. This is handled by the streamingDomService.
            streamingDomService.deleteStreamingDomElement(uid);
        };
    }, [
        markdownOptions?.syntaxHighlighter,
        markdownOptions?.markdownLinkTarget,
        markdownOptions?.showCodeBlockCopyButton,
        markdownOptions?.skipStreamingAnimation,
        markdownOptions?.streamingAnimationSpeed,
    ]);

    const rootElement: ReactElement = useMemo(() => {
        if (responseRenderer) {
            const StreamResponseRendererComp = responseRenderer as FC<StreamResponseComponentProps<AiMsg>>;
            return (
                <StreamResponseRendererComp
                    uid={uid}
                    status={status}
                    containerRef={rootElRef as RefObject<never>}
                    content={undefined}
                    serverResponse={undefined}
                    dataTransferMode={'stream'}
                />
            );
        } else {
            return <div className={'nlux-md-strm-root'} ref={rootElRef}/>;
        }
    }, [responseRenderer]);

    useEffect(() => {
        return () => {
            rootElRefPreviousValue.current = null;
            mdStreamParserRef.current?.complete();
            mdStreamParserRef.current = null;
            setStreamContainer(undefined);
        };
    }, []);

    useImperativeHandle(ref, () => ({
        streamChunk: (chunk: AiMsg) => {
            if (typeof chunk === 'string') {
                mdStreamParserRef.current?.next(chunk);
            } else {
                warn('When using a markdown stream renderer, the chunk must be a string.');
            }
        },
        completeStream: () => mdStreamParserRef.current?.complete(),
    }), []);

    const compDirectionClassName = compMessageDirectionClassName['incoming'];
    const compStatusClassName = compMessageStatusClassName[status];
    const className = `${compMessageClassName} ${compStatusClassName} ${compDirectionClassName}`;

    return <div className={className}>{rootElement}</div>;
};
