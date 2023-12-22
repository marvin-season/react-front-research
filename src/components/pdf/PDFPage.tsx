import {Page} from "react-pdf";
import {usePDFHighLight} from "./usePDFHighLight.ts";
import React from "react";
import {onHighLighted} from '../../types'

const PDFPage: React.FC<{
    keyword: string,
    pageWidth: number, onHighLighted?: onHighLighted,
    pageNumber: number,
}> = ({
          keyword,
          pageWidth,
          pageNumber,
          onHighLighted
      }) => {
    const {handleCustomTextRenderer, handleRenderTextLayerSuccess} = usePDFHighLight(keyword, pageNumber,onHighLighted);
    return (
        <>
            <Page
                renderAnnotationLayer={false}
                // key={pageKey}
                width={pageWidth}
                onLoadSuccess={console.log}
                onRenderTextLayerSuccess={handleRenderTextLayerSuccess}
                customTextRenderer={handleCustomTextRenderer}
                pageNumber={pageNumber}
            />
        </>
    );
};

export default PDFPage;