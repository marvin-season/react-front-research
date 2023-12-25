import {useEffect, useRef, useState} from "react";
import {excludeChar, getIntersectionByIndex, matchAndGetPosition} from "../../utils";
import {onHighLighted} from '../../types'

const _1ST_RENDER = "1st_render";
const _MORE_RENDER = "more_render";

type MatchRangeType = [number, number]

/**
 * 第二次扫描index记录
 */
let initCurrentIndex = 0;
/**
 * 第一次扫描得到PDF上下文
 */
const initContextInfo = {
    remainingContent: '',
    content: "",
    ranges: [] as MatchRangeType[]
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

                const lastIndex = currentIndex.current

                currentIndex.current += str.length;
                // if (!inRange(lastIndex, contextInfo.current.ranges)) {
                //     // 没达到高亮区域
                //     return str;
                // }
                if (currentIndex.current == 1406) debugger

                console.log(str, currentIndex)

                for (const range of contextInfo.current.ranges) {
                    // 进入高亮范围，拿到高亮段落和高亮区域的重叠位置
                    const [start, length] =
                        getIntersectionByIndex(range[0], range[0] + range[1], lastIndex, currentIndex.current);
                    const hlValue = str.substring(start, start + length);
                    if (hlValue) {
                        const prefixStr = str.substring(0, start)
                        const suffixStr = str.substring(start + length)
                        return `${prefixStr}<mark id="mark-highlight-pdf${pageNumber}">${hlValue}</mark>${suffixStr}`;
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
                    remainingContent: '',
                    content: contextInfo.current.content,
                    ranges: [] as MatchRangeType[]
                };
                keywords.forEach(item => {
                    const keyword = excludeChar(item);
                    debugger
                    const {
                        startIndex,
                        length,
                        remainingContent,
                        consumedContent
                    } = matchAndGetPosition(contextInfo.current.content, keyword);

                    // console.log(remainingContent, consumedContent, startIndex, length)
                    nextCurrentInfo.content = "";
                    nextCurrentInfo.remainingContent = "";
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