import React from "react";
import {DocRenderer} from "@cyntler/react-doc-viewer";

export const MyCustomPNGRenderer: DocRenderer = ({mainState: {currentDocument}}) => {
    if (!currentDocument) return null;

    return (
        <div id="my-png-renderer" style={{width: '200px'}}>
            <img id="png-img" src={currentDocument.fileData as string}/>
        </div>
    );
};

MyCustomPNGRenderer.fileTypes = ["png", "image/png"];
MyCustomPNGRenderer.weight = 1;