import * as pdfjsLib from "pdfjs-dist";
import {PDFDocumentProxy} from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";
import {PageViewport} from "pdfjs-dist/types/src/display/display_utils";
import PDFHighLighter from "./PDFHighLighter.tsx";
import {deleteChat} from "../../utils/utils.ts";
import {TextItem} from "pdfjs-dist/types/src/display/api";

export default class PDFRender {
    static SVG_NS = "http://www.w3.org/2000/svg";
    pdfDocumentProxy: PDFDocumentProxy | null;
    pdfUrl: string
    pageScale: number
    numPages: number = 0
    pdfHighLighter?: PDFHighLighter

    constructor({pdfUrl, pdfHighLighter, pageScale = 1.2}: {
        pdfUrl: string,
        pageScale?: number;
        pdfHighLighter?: PDFHighLighter
    }) {
        this.pdfUrl = pdfUrl
        this.pageScale = pageScale
        this.pdfDocumentProxy = null
        this.pdfHighLighter = pdfHighLighter
    }

    async load() {
        const loadingTask = pdfjsLib.getDocument({url: this.pdfUrl});
        this.pdfDocumentProxy = await loadingTask.promise;
        this.numPages = this.pdfDocumentProxy.numPages
    }


    async renderPage(pageNumber: number) {
        if (!this.pdfDocumentProxy) {
            return
        }
        const page = await this.pdfDocumentProxy.getPage(pageNumber);
        const viewport = page.getViewport({scale: this.pageScale});
        const textContent = await page.getTextContent();
        return this.buildSvg(viewport, textContent, pageNumber)
    }

    renderAllPage() {
        if (!this.pdfDocumentProxy) {
            return
        }

        const pages = Array.from({length: this.pdfDocumentProxy.numPages}, (_, i) => i + 1)
        return Promise.all(pages.map(i => this.renderPage(i)))
    }

    async highlightInfo(highlighter: PDFHighLighter) {
        if (!this.pdfDocumentProxy) {
            return
        }

        let currentPageNumber = 1;

        do {
            const page = await this.pdfDocumentProxy.getPage(currentPageNumber);
            const textContent = await page.getTextContent();
            highlighter.addDoc(currentPageNumber, textContent.items as TextItem[])
            const find = highlighter.search(highlighter.searchText);
            if (find) {
                break
            }

            currentPageNumber += 1;


        } while (currentPageNumber <= this.pdfDocumentProxy.numPages)
    }

    private buildSvg(viewport: PageViewport, textContent: { items: any; styles: any },
                     pageNumber: number) {
        // find记录了当前页的高亮信息
        const find = this.pdfHighLighter?.documentHighlightInfo?.find(item => item.pageNumber == pageNumber)
        let currentIndex = 0;

        // Building SVG with size of the viewport (for simplicity)
        const svg = document.createElementNS(PDFRender.SVG_NS, "svg:svg");
        svg.setAttribute("width", viewport.width + "px");
        svg.setAttribute("height", viewport.height + "px");
        // items are transformed to have 1px font size
        svg.setAttribute("font-size", "1");

        // processing all items
        textContent.items.forEach(function (textItem: {
            transform: any;
            fontName: string | number;
            str: string | null;
        }) {
            // we have to take in account viewport transform, which includes scale,
            // rotation and Y-axis flip, and not forgetting to flip text.
            const tx = pdfjsLib.Util.transform(
                pdfjsLib.Util.transform(viewport.transform, textItem.transform),
                [1, 0, 0, -1, 0, 0]
            );
            const style = textContent.styles[textItem.fontName];
            // adding text element
            const text = document.createElementNS(PDFRender.SVG_NS, "svg:text");
            text.setAttribute("transform", "matrix(" + tx.join(" ") + ")");
            text.setAttribute("font-family", style.fontFamily);
            text.textContent = textItem.str;

            if (find) {
                if (currentIndex >= find.startIndex && currentIndex < find.endIndex) {
                    text.setAttribute("fill", '#e8a411');
                    text.setAttribute("id", 'pdf-hl');
                }
            }
            if (textItem.str) {
                currentIndex += deleteChat(textItem.str, PDFHighLighter.regex).length
            }
            svg.append(text);
        });
        currentIndex = 0
        return svg;
    }
}


