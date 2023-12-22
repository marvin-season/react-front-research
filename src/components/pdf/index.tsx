import {Document, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import PDFPage from "./PDFPage.tsx";
import {handleScroll} from "../../utils";
import {useState} from "react";

const hlInfos = [
    "Etiam fringilla hendrerit purus sed vestibulum. Morbi congue diam vitae justo pellentesque mollis.\n" +
    "Aenean non sem tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur\n" +
    "ridiculus mus. Pellentesque eget semper ligula, et luctus odio. Nam ac metus nec ex euismod varius\n" +
    "ac a ligula. Curabitur vel scelerisque odio. In\n" +
    "pellentesque massa sit amet tortor aliquam,",
    "finibus nibh. Praesent\n" +
    "interdum, ex eu luctus\n" +
    "semper, dolor metus\n" +
    "congue orci, in auctor\n" +
    "neque erat vitae nibh.\n" +
    "Donec pretium purus nec\n" +
    "ante efficitur vulputate.\n" +
    "Proin lacus nisl, blandit quis\n" +
    "diam eget, imperdiet iaculis\n" +
    "lectus. Aliquam commodo\n" +
    "arcu est, sit amet aliquet\n" +
    "odio sollicitudin vel.\n",
    "Integer ullamcorper fringilla pulvinar."
]

const getHLText = (i: number) => {
    // @ts-ignore
    return hlInfos[i] ?? ''
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
                                    keyword={getHLText(index)}
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
