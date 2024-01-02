import React from "react";
import {PDFViewer2} from "../../components/pdf2/PDFViewer.tsx";

const workerUrl = "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js";
export const PDFViewPage2: React.FC<{}> = props => {
    return (
        <>
            <PDFViewer2 workerUrl={workerUrl} fileUrl="demo2.pdf" onDocumentLoad={() => {
                console.log('onDocumentLoad');
            }}/>
        </>
    );
};