import {Viewer, Worker} from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {searchPlugin} from '@react-pdf-viewer/search';
import {useEffect, useState} from 'react';

const str = '第三是品牌。品牌是一个非常综合的因素，有历史也有未来，因为它是对过去行为的评\n' +
    '估，也是对未来行为的预估，是一种无形资产，价值也是在不断变化的。为什么我们在合肥'
const exclude = (str: string) => str.replace(/\n+/g, '');
export const PDFViewer2 = ({workerUrl, fileUrl, onDocumentLoad}: any) => {

    const [isDocumentLoaded, setDocumentLoaded] = useState(false);
    const [value, setValue] = useState(exclude(str))

    const searchPluginInstance = searchPlugin({
        // keyword: value,
    })
    const {highlight} = searchPluginInstance;

    const handleDocumentLoad = () => {
        setDocumentLoaded(true);
        onDocumentLoad && onDocumentLoad();
    };

    useEffect(() => {
        if (value && isDocumentLoaded) {
            highlight(exclude(value));
        }
    }, [isDocumentLoaded, value]);


    return <Worker workerUrl={workerUrl}>
        <input type="text" value={value} onChange={(e) => {
            setValue(e.target.value)
        }}/>
        <button onClick={() => {
            if (value.length == 0) {
                return
            }
            if (!isDocumentLoaded) {
                return
            }
            console.log(value)
            highlight(exclude(value));
        }
        }>highlight
        </button>
        <div style={{width: '900px', height: '800px', overflow: 'scroll'}}>
            <Viewer onDocumentLoad={handleDocumentLoad} key={0} fileUrl={fileUrl} plugins={[searchPluginInstance]}/>
        </div>
    </Worker>
}
