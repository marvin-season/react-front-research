import {IHeaderOverride} from "@cyntler/react-doc-viewer";

export const MyHeader: IHeaderOverride = (state, previousDocument, nextDocument) => {
    if (!state.currentDocument || state.config?.header?.disableFileName) {
        return null;
    }

    return (
        <>
            <div>{state.currentDocument.uri || ""}</div>
            <div>
                <button onClick={previousDocument} disabled={state.currentFileNo === 0}>
                    Previous Document
                </button>
                <button
                    onClick={nextDocument}
                    disabled={state.currentFileNo >= state.documents.length - 1}
                >
                    Next Document
                </button>
            </div>
        </>
    );
};
