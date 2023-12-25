import {Document, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import PDFPage from "./PDFPage.tsx";
import {handleScroll} from "../../utils";
import {useState} from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdf.worker.js', import.meta.url).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};


export default function PDFViewer({keyword, pageNumber: currentPageNumber}: {
    keyword: string,
    pageNumber: number
}) {
    const [totalPages, setTotalPages] = useState(0);


    return (
        <>

            <div style={{height: '600px', overflow: 'auto'}}>

                <Document file={'demo.pdf'} options={options} onLoadSuccess={({numPages}) => {
                    setTotalPages(numPages);
                }}>
                    {
                        Array(totalPages).fill(-1).map((item, index) => {

                            return <div key={index}>
                                <PDFPage
                                    keywords={[keyword]}
                                    pageWidth={800}
                                    pageNumber={index + 1}
                                    onHighLighted={(keyword, pageNumber) => {
                                        if (pageNumber == currentPageNumber) {
                                            console.log(`skip to #mark-highlight-pdf${pageNumber}`);
                                            handleScroll(`#mark-highlight-pdf${pageNumber}`)
                                        }
                                    }}
                                />
                            </div>
                        })
                    }
                </Document>
            </div>
        </>

    );
}
