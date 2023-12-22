import {useEffect, useRef, useState} from "react";
import {excludeChar, getIntersectionByIndex, inRange, matchAndGetPosition} from "../../utils";
import {onHighLighted} from '../../types'

const _1ST_RENDER = "1st_render";
const _MORE_RENDER = "more_render";

/**
 * 第二次扫描index记录
 */
let initCurrentIndex = 0;
/**
 * 第一次扫描得到PDF上下文
 */
const initContextInfo = {
    content: "",
    startIndex: 0,
    endIndex: 0
};


/**
 * 两次渲染，第一次记录高亮在全文的位置，第二次判断是否在区域内，高亮pdf
 */
export const usePDFHighLight = (keywords: string[], pageNumber: number, onHighLighted?: onHighLighted) => {
    const contextInfo = useRef(JSON.parse(JSON.stringify(initContextInfo)));
    const currentIndex = useRef(initCurrentIndex);
    // 促使pdf 的page重新渲染
    const [pageKey, setPageKey] = useState(_1ST_RENDER);

    const resetState = () => {
        contextInfo.current = JSON.parse(JSON.stringify(initContextInfo));
        currentIndex.current = initCurrentIndex;
    };

    useEffect(() => {
        setPageKey(_1ST_RENDER);
        resetState();
    }, [keywords]);

    const handleCustomTextRenderer = ({str: strItem}: { str: string }) => {
        let str = excludeChar(strItem);
        // 1st render
        if (pageKey == _1ST_RENDER) {
            contextInfo.current.content += str;
            return str;
        } else if (pageKey == _MORE_RENDER) {
            // more render
            try {
                if (str.length == 0) {
                    return str;
                }
                debugger

                currentIndex.current += str.length;
                if (!inRange(currentIndex.current - str.length, contextInfo.current.ranges)) {
                    // 没达到高亮区域
                    return str;
                }


                for (const range of contextInfo.current.ranges) {
                    // 进入高亮范围，拿到高亮段落和高亮区域的重叠位置
                    const [start, length] =
                        getIntersectionByIndex(range[0], range[0] + range[1], currentIndex.current - str.length, currentIndex.current);
                    const hlValue = str.substring(start, start + length);
                    if (hlValue) {
                        return `${str.substring(0, start)}<mark class="mark-highlight-pdf" id="mark-highlight-pdf${pageNumber}">${hlValue}</>${str.substring(start + length)}`;
                    }
                }

                return str;
            } catch (e) {
                console.log(e);
                return str;
            }
        } else {
            return str;

        }
    };

    const handleRenderTextLayerSuccess = () => {
        if (pageKey == _1ST_RENDER) {
            // 第一次渲染完成
            console.log(_1ST_RENDER);
            try {
                const nextCurrentInfo = {
                    content: "",
                    ranges: [] as number[][]
                };
                keywords.forEach(item => {
                    const keyword = excludeChar(item);
                    const {startIndex, length} = matchAndGetPosition(contextInfo.current.content, keyword);
                    nextCurrentInfo.content = "";
                    nextCurrentInfo.ranges.push([startIndex, length]);
                });
                contextInfo.current = nextCurrentInfo;
            } catch (e) {
                resetState();
                console.log(e);
            }
            setPageKey(_MORE_RENDER);
        } else if (pageKey == _MORE_RENDER) {
            onHighLighted && onHighLighted('', pageNumber)
            console.log(_MORE_RENDER);
            currentIndex.current = initCurrentIndex;
            // handleScroll("#mark-highlight-pdf");
        }
    };

    return {
        handleCustomTextRenderer,
        handleRenderTextLayerSuccess
    };
};