import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {useRef, useState} from "react";
import {excludeSym, getIntersectionByIndex, getPosition} from "../../utils";

const _1ST_RENDER = '1st_render'
const _MORE_RENDER = 'more_render'

const keyword = '。我们过去在做，现在仍然做的代\n' +
    '理分销的业务由于有非常高的运营指标，仍然也是资本市场非常喜欢的业务内容。如何在进\n' +
    '销存、净利率、市占率等等领域里面 ，不断地提升我们的运营效率，也是提升我们企业价值\n' +
    '很重要的方面。  \n' +
    '第三是品牌。 品牌是一个非常综合的因素，有历史也有未来，因为它是对过去行为的评\n' +
    '估，也是对未来行为的预估，是一种无形资产 ，价值也是在'


const contextInfo = {
    content: '',
    startIndex: -1,
    endIndex: -1
}

const contextScanInfo = {
    currentIndex: 0
}


pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdf.worker.js', import.meta.url).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};


export default function Sample() {
    const inputRef = useRef(null);
    const [pageKey, setPageKey] = useState(_1ST_RENDER)
    const handleCustomTextRenderer = ({str}: { str: string }) => {
        if (pageKey == _1ST_RENDER) {
            console.log(_1ST_RENDER)
            contextInfo.content += str
        } else if (pageKey == _MORE_RENDER) {
            console.log(_MORE_RENDER)
            try {
                contextScanInfo.currentIndex += str.length
                if (contextScanInfo.currentIndex < contextInfo.startIndex) return str;
                const [start, length] = getIntersectionByIndex(contextInfo.startIndex, contextInfo.endIndex, contextScanInfo.currentIndex - str.length, contextScanInfo.currentIndex)

                return `${str.substring(0, start)}<mark>${str.substring(start, start + length)}</mark>${str.substring(start + length)}`
            } catch (e) {
                console.log(e)
                return str
            }
        }
        return str
    }

    return (
        <Document file={'demo2.pdf'} options={options}>
            <Page
                key={pageKey}
                inputRef={inputRef}
                customTextRenderer={handleCustomTextRenderer}
                onRenderTextLayerSuccess={() => {
                    if (pageKey == _1ST_RENDER) {
                        let keyword_ = excludeSym(keyword);
                        let {startIndex, length} = getPosition(contextInfo.content, keyword_);
                        contextInfo.startIndex = startIndex
                        contextInfo.endIndex = startIndex + length
                        setPageKey(_MORE_RENDER)
                    } else if (pageKey == _MORE_RENDER) {

                        console.log(contextInfo, contextScanInfo)
                    }
                }}
                pageNumber={1}
                width={600}
            />
        </Document>
    );
}
