import React, {useEffect, useRef} from "react";
import * as pdfjsLib from 'pdfjs-dist';
// PDF 文件路径
const pdfPath = 'demo.pdf';
const workerUrl = "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl
// new URL("pdf.worker.js", import.meta.url).toString();
// 获取 Canvas 元素

// 执行搜索

// 调用搜索函数，传入要搜索的内容
const searchTerm = '合同生效'; // 替换为你要搜索的内容

const Index: React.FC<{}> = props => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null)

    function searchInPDF(searchTerm: string, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {

        pdfjsLib.getDocument({
            url: pdfPath,
        }).promise.then(pdfDoc => {

            pdfDoc.getPage(1).then(page => {
                const viewport = page.getViewport({scale: 1});
                canvas.width = viewport.width
                canvas.height = viewport.height

                page.getTextContent().then(content => {
                    // content.items.forEach(item => {
                    //     if (item.str.includes(searchTerm)) {
                    //
                    //         context.fillStyle = 'yellow';
                    //         context.fillRect(0, 0, canvas.width, canvas.height);
                    //
                    //     }
                    // });

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    page.render(renderContext);
                });

            })

        });
    }

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            const canvas = canvasRef.current

            if (context) {
                searchInPDF(searchTerm, canvas, context);

            }
        }
    }, []);
    return (
        <div style={{position: 'relative'}} ref={canvasContainerRef}>
            <canvas ref={canvasRef}>
            </canvas>
        </div>
    );
};

export default Index