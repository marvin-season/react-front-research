import React from "react";
import MarkdownPreview from '@uiw/react-markdown-preview';

export const Md: React.FC = ({}) => {
    const markdownContent: string = `
  # Hello!

  This is  highlighted a paragraph

  This paragraph should be highlighted

  This is another highlighted paragraph.

  ## Paragraph

  `;

    const highlightedText = 'highlight';

    const regex = new RegExp(`(${highlightedText})`, 'g');

    const convert = () => markdownContent.replace(regex, `<span style='color:blue'>$1</span>`);

    return (
        <>
            <MarkdownPreview wrapperElement={{'data-color-mode': 'light'}} source={convert()}/>
        </>
    );
};