/**
 * 记录高亮的信息、实现高亮功能
 */

import {TextItem} from "pdfjs-dist/types/src/display/api";
import {deleteChat, getOffsetAndLength} from "../../utils/utils.ts";


type PageContent = {
    content: string;
    pageNumber: number;
    startIndex?: number;
    endIndex?: number;
}
/**
 * documentContent 中搜索 searchText
 */
export default class PDFHighLighter {
    static regex = /[\\.+\s*\n]/g
    private pageNumberSet: Set<number>
    /**
     * 累加文本
     */
    private _documentContentArray: PageContent[] = []
    /**
     * 累加文本项
     */
    documentTextItems: Array<TextItem> = []
    /**
     * 搜索段落
     */
    searchText?: string = undefined
    /**
     * 整个文档命中起点
     */
    startIndex: number = -1;
    /**
     * 整个文档命中终点
     */
    endIndex: number = -1;

    constructor(searchText: string) {
        this.searchText = searchText;
        this.pageNumberSet = new Set()
    }

    addDoc(pageNumber: number, items: Array<TextItem>) {
        if (this.pageNumberSet.has(pageNumber)) {
            return
        }

        this.pageNumberSet.add(pageNumber);
        const items2Document = items.reduce((prevStr, curObj) => {
            return prevStr + curObj.str;
        }, '')

        this._documentContentArray.push({
            content: deleteChat(items2Document, PDFHighLighter.regex),
            pageNumber
        });

        this.documentTextItems = items
    }

    search(searchText?: string) {
        if (!searchText) {
            console.log('searchText is undefined!')
            return
        }

        this.searchText = deleteChat(searchText, PDFHighLighter.regex);
        const startIndex = this.pdfDocumentStr.indexOf(this.searchText);

        // 匹配到了
        if (startIndex > -1) {
            this.startIndex = startIndex;
            this.endIndex = startIndex + this.searchText.length
            return true
        } else {
            // 未匹配到
            return false
        }
    }

    get pdfDocumentStr() {
        return this._documentContentArray.reduce((prevStr, curObj) => {
            return prevStr + curObj.content;
        }, '');
    }

    get documentHighlightInfo() {
        // 有命中信息
        if (this.startIndex > -1) {
            let docCurrentIndex = 0;
            return this._documentContentArray.map(item => {
                const pageContentLength = item.content.length
                docCurrentIndex += pageContentLength
                const [startIndex, l] = getOffsetAndLength(docCurrentIndex - pageContentLength, docCurrentIndex, this.startIndex, this.endIndex)
                return {
                    ...item,
                    startIndex,
                    endIndex: startIndex + l
                }
            })
        }
    }
}














