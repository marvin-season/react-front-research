import PSPDFKit from "pspdfkit";


export const getInstance = async (dom: HTMLDivElement) => await PSPDFKit.load({
    container: dom,
    document: 'document.pdf',
});