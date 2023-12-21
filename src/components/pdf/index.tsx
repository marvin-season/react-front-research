import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const keyword = '。我们过去在做，现在仍然做的 代\n' +
    '理分销的业务由于有非常高的运营指标，仍然也是资本市场非常喜欢的业务内容。如何在进\n' +
    '销存、净利率、市占率等等领域里面 ，不断地提升我们的运营效率，也是提升我们企业价值\n' +
    '很重要的方面。  \n' +
    '第三是品牌。 品牌是一个非常综合的因素，有历史也有未来，因为它是对过去行为的评\n' +
    '估，也是对未来行为的预估，是一种无形资产 ，价值也是在 不断变化的。为什么我们在合肥'


pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdf.worker.js', import.meta.url).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
// ).toString();
console.log(pdfjs.GlobalWorkerOptions.workerSrc)

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};


export default function Sample() {
    return (
        <Document file={'demo2.pdf'} options={options}>
            <Page
                pageNumber={1}
                width={600}
            />
        </Document>
    );
}
