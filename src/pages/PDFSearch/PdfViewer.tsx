import {FC, useEffect, useRef} from "react";
import {handleScroll} from "../../utils/utils.ts";
import PDFRender from "./PDFRender.ts";
import PDFHighLighter from "./PDFHighLighter.tsx";

const PdfViewer: FC<{
    pdfUrl: string;
    searchText: string;
}> = ({pdfUrl, searchText}) => {
    const pdfContainerRef = useRef<HTMLDivElement>(null);

    const renderPages = async function* ({pdfUrl, searchText}: { pdfUrl: string; searchText: string }) {
        const pdfHighLighter = new PDFHighLighter(searchText)

        const pdfRender = new PDFRender({
            pdfUrl,
            pageScale: 1,
            pdfHighLighter
        });

        await pdfRender.load()
        await pdfRender.highlightInfo(pdfHighLighter)

        for (let i = 1; i <= pdfRender.numPages; i++) {
            yield pdfRender.renderPage(i)
        }

    }

    const run = async () => {
        try {
            if (pdfContainerRef.current) {
                if (pdfContainerRef.current.hasChildNodes()) {
                    pdfContainerRef.current.innerHTML = ''
                }
                for await (const page of renderPages({pdfUrl, searchText})) {
                    page && pdfContainerRef.current.appendChild(page);
                }
                return Promise.resolve(true)
            }

        } catch (e) {
            console.error(e);
        }
    }


    useEffect(() => {
        run().then(() => {
            handleScroll('#pdf-hl');
        })
    }, [pdfUrl, searchText, run]);


    return <div style={{display: "flex", flexDirection: 'column'}} ref={pdfContainerRef}></div>;
}

export default PdfViewer;
