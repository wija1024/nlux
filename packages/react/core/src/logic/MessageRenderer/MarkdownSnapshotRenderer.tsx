import {useEffect, useMemo, useRef} from 'react';
import {attachCopyClickListener} from '../../../../../shared/src/markdown/copyToClipboard/attachCopyClickListener';
import {parseMdSnapshot} from '../../../../../shared/src/markdown/snapshot/snapshotParser';
import {SnapshotParserOptions} from '../../../../../shared/src/types/markdown/snapshotParser';

export const MarkdownSnapshotRenderer = (props: {
    messageUid: string,
    content: string,
    markdownOptions?: SnapshotParserOptions,
}) => {
    const {markdownOptions} = props;
    const markdownContainerRef = useRef<HTMLDivElement>(null);
    const parsedContent = useMemo(() => {
        if (!props.content) {
            return '';
        }

        return parseMdSnapshot(props.content, {
            syntaxHighlighter: markdownOptions?.syntaxHighlighter,
            markdownLinkTarget: markdownOptions?.markdownLinkTarget,
            showCodeBlockCopyButton: markdownOptions?.showCodeBlockCopyButton,
        });
    }, [props.content, markdownOptions?.markdownLinkTarget, markdownOptions?.syntaxHighlighter]);

    useEffect(() => {
        if (markdownContainerRef.current) {
            attachCopyClickListener(markdownContainerRef.current);
        }
    }, [parsedContent, markdownContainerRef.current]);

    return (
        <div className={'nlux-md-strm-root'}>
            <div className="nlux-md-cntr" ref={markdownContainerRef} dangerouslySetInnerHTML={{__html: parsedContent}}/>
        </div>
    );
};
