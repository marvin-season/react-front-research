import React, {useEffect, useRef} from "react";
import DocViewer, {DocViewerRef, DocViewerRenderers} from "@cyntler/react-doc-viewer";
import {MyHeader} from "./MyHeader.tsx";

export const MyDocViewer: React.FC<{}> = props => {
    const docViewerRef = useRef<DocViewerRef>(null);
    const docs = [
        {
            uri: '/doc',
        },
        {
            uri: 'demo.pdf',
        },
        {
            uri: 'demo.png',
        },
        {
            uri: 'demo.xlsx',
        },
    ]
    useEffect(() => {
        if (docViewerRef.current) {
            console.log(docViewerRef.current)
        }
    }, []);
    return (
        <>
            <DocViewer
                ref={docViewerRef}
                config={{
                    noRenderer: {
                        overrideComponent: () => <div>no render</div>
                    },
                    header: {
                        disableHeader: false,
                        disableFileName: false,
                        retainURLParams: true,
                        overrideComponent: MyHeader,
                    },
                    loadingRenderer: {
                        overrideComponent: () => <>LOADING</>
                    },
                    csvDelimiter: ",", // "," as default,
                    pdfZoom: {
                        defaultZoom: 1, // 1 as default,
                        zoomJump: 0.2, // 0.1 as default,
                    },
                    pdfVerticalScrollByDefault: true, // false as default
                }}
                documents={docs}
                pluginRenderers={DocViewerRenderers}
            />
        </>
    );
};