import {Viewer, Worker} from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {searchPlugin} from '@react-pdf-viewer/search';
import {useEffect, useState} from 'react';

const str = '同VMware合作\n' +
    '在公有云私有化方面取得了技术上的重大突破，这是未来多云混合平台的方向，非常难能可\n' +
    '贵。'

const exclude = (str: string) => str.replace(/[\s\n]+/g, '');

const convert = (str: string) => {
    let split = str.split(/[\s\n]+/g).filter(item => item.length > 5);
    console.log(split)
    return split

}
export const PDFViewer2 = ({workerUrl, fileUrl, onDocumentLoad}: any) => {

    const [isDocumentLoaded, setDocumentLoaded] = useState(false);
    const [value, setValue] = useState<string>()

    const searchPluginInstance = searchPlugin({})
    const {highlight} = searchPluginInstance;

    const handleDocumentLoad = () => {
        setDocumentLoaded(true);
        onDocumentLoad && onDocumentLoad();
    };

    useEffect(() => {
        if (value && isDocumentLoaded) {
            highlight(convert(value));
        }
    }, [isDocumentLoaded, value]);


    return <Worker workerUrl={workerUrl}>
        <input type="text" value={value} onChange={(e) => {
            setValue(e.target.value)
        }}/>
        <div style={{width: '900px', height: '800px', overflow: 'scroll'}}>
            <Viewer onDocumentLoad={handleDocumentLoad} key={0} fileUrl={fileUrl} plugins={[searchPluginInstance]}/>
        </div>
    </Worker>
}
