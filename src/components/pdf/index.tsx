import {Document, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import PDFPage from "./PDFPage.tsx";
import {handleScroll} from "../../utils";
import {useState} from "react";

const hlInfos = [
    [
        "Consectetur adipiscing elit. Maecenas hendrerit accumsan ante at scelerisque. Donec sodales\n" +
        "placerat dui. Nulla ac orci eu justo feugiat mollis in eu odio. Duis luctus sed quam sit amet mattis.\n" +
        "Cras ac turpis sit amet lorem eleifend bibendum sed nec ligula.",
        "isl. Aenean at hendrerit justo, id aliquet nunc. Sed mi ante, pretium id\n" +
        "condimentum sed, accumsan blandit lacus. Maecenas sit amet finibus nibh. Praesent interdum, ex eu\n" +
        "luctus semper, dolor metus congue orci, in auctor neque erat vitae nibh"
    ],

    [
        "arcu est, sit amet aliquet\n"
    ]
]

const getHLText = (i: number) => {
    // @ts-ignore
    return hlInfos[i] ?? []
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdf.worker.js', import.meta.url).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};


export default function Sample() {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    return (
        <>
            <div>
                {
                    hlInfos.map((item, index) => <button onClick={() => {
                        setCurrentPageIndex(index)
                    }}>第{index + 1}页高亮位置
                    </button>)
                }
            </div>

            <div style={{height: '700px', overflow: 'auto'}}>

                <Document file={'demo.pdf'} options={options} onLoadSuccess={({numPages}) => {
                    setTotalPages(numPages);
                }}>
                    {
                        Array(totalPages).fill(-1).map((item, index) => {

                            return <div key={index}>
                                <PDFPage
                                    keywords={getHLText(index)}
                                    pageWidth={800}
                                    pageNumber={index + 1}
                                    onHighLighted={(keyword, pageNumber) => {
                                        if (currentPageIndex + 1 == pageNumber) {
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
