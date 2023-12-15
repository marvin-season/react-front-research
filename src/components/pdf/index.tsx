// import {useState} from 'react';
// import {Document, Page, pdfjs} from 'react-pdf';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
//
// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdf.worker.js', import.meta.url).toString();
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// //     'pdfjs-dist/build/pdf.worker.min.js',
// //     import.meta.url,
// // ).toString();
// console.log(pdfjs.GlobalWorkerOptions.workerSrc)
//
// const options = {
//     cMapUrl: '/cmaps/',
//     standardFontDataUrl: '/standard_fonts/',
// };
//
// const resizeObserverOptions = {};
//
// const maxWidth = 800;
//
// type PDFFile = string | File | null;
//
// export default function Sample() {
//     const [file, setFile] = useState<PDFFile>('demo.pdf');
//     const [containerWidth, setContainerWidth] = useState<number>();
//
//     const [currentPage, setCurrentPage] = useState(1)
//
//
//     return (
//         <Document file={file} options={options}>
//             <Page
//                 pageNumber={currentPage}
//                 width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
//             />
//         </Document>
//     );
// }
