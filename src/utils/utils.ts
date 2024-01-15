/**
 * @param fileName
 * @return 获取文件后缀
 */
export const getFileSuffix = (fileName: string) => {
    const suffix = fileName?.split(".").pop();
    return suffix ?? "";
};
export const deleteChat = (str: string, regex = /[.*\s*\n+]*/g) => {
    return str.replace(regex, '')
}

export const handleScroll = (selector: string) => {
    let all = document.querySelectorAll(selector);
    const targetEle = all[0];
    targetEle?.scrollIntoView({behavior: "smooth"});
};

/**
 *
 * @param content
 * @param targetStr
 * @return 获取targetStr在content的位置
 */
export const matchAndGetPosition = (content: string, targetStr: string) => {

    const startIndex = content.indexOf(targetStr);
    if (startIndex == -1) {
        const bySlide = findCommonStrBySlide(content, targetStr);
        if (bySlide.length > 0) {
            return bySlide
        }
        return findCommonStrByFirstStr(content, targetStr);
    }
    return {
        startIndex,
        length: targetStr.length
    };
};

export const adjustStrByLength = (str1: string, str2: string) => {
    return str1.length < str2.length ? {shorterStr: str1, longerStr: str2} : {
        shorterStr: str2,
        longerStr: str1
    };
};

export const findCommonStrByLonger = (str1: string, str2: string) => {
    const {shorterStr, longerStr} = adjustStrByLength(str1, str2);
    return findCommonStrByFirstStr(longerStr, shorterStr);
};

/**
 * @param str1
 * @param str2
 * @return str1 str2 的公共字符串
 */
export const findCommonStrByFirstStr = (str1: string, str2: string) => {

    let maxLength = 0;
    let startingIndex = -1;

    for (let i = 0; i < str1.length; i++) {
        for (let j = 0; j < str2.length; j++) {
            let k = 0;
            while (str1[i + k] === str2[j + k]) {
                k++;
                if (i + k >= str1.length || j + k >= str2.length)
                    break;
            }
            if (k > maxLength) {
                maxLength = k;
                startingIndex = i;
            }
        }
    }

    if (maxLength > 0) {
        return {
            startIndex: startingIndex,
            substring: str1.substring(startingIndex, startingIndex + maxLength),
            length: maxLength
        };
    } else {
        return {
            startIndex: -1,
            substring: "",
            length: 0
        };
    }
};


/**
 *
 * @param startIndex 第一段
 * @param endIndex 第一段
 * @param targetStartIndex 第二段
 * @param targetEndIndex 第二段
 *
 * @return 以第一段为基准，获取第二段与第一段相交的偏移量和重叠长度
 */
export const getOffsetAndLength = (startIndex: number, endIndex: number, targetStartIndex: number, targetEndIndex: number) => {
    const maxStartIndex = Math.max(startIndex, targetStartIndex);
    const minEndIndex = Math.min(endIndex, targetEndIndex);
    if (maxStartIndex > minEndIndex) {
        return [-1, 0];
    }

    return [maxStartIndex - startIndex, minEndIndex - maxStartIndex + 1];
};


// 从文件url获取文件名
export const getFileNameFromUrl = (url: string) => {
    const parsedURL = new URL(url);
    const pathname = parsedURL.pathname; // 获取路径部分

// 从路径中提取文件名
    const fileName = pathname.split("/").pop(); // 取路径中最后一个部分作为文件名
    return fileName ? decodeURIComponent(fileName) : "";
};

export const findCommonStrBySlide = (str1: string, str2: string) => {
    let commonStr = ''
    let index = str1.length - 1
    while (index >= 0) {
        commonStr = str1.substring(index)
        if (str2.indexOf(commonStr) === -1) {
            break
        }
        index--
    }
    return {
        startIndex: index,
        length: commonStr.length
    }

}

console.log(findCommonStrBySlide('aaaa6382', '3821312sadasdas'));