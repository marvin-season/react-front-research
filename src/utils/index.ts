export const getFileSuffix = (fileName: string) => {
    const suffix = fileName?.split(".").pop();
    return suffix ?? "";
};

export const handleScroll = (selector: string) => document.querySelector(selector)?.scrollIntoView({behavior: "smooth"});
export const matchAndGetPosition = (content: string, targetStr: string) => {
    console.log(targetStr)
    console.log(content)

    const result = {
        startIndex: -1,
        length: -1,
        consumedContent: '',
        remainingContent: ''
    }
    const startIndex = content.indexOf(targetStr);

    if (startIndex == -1) {
        let {startIndex, length, substring} = findCommonStrByLonger(content, targetStr);
        if (startIndex != -1 && content.endsWith(substring)) {
            result.startIndex = startIndex
            result.length = length
            result.consumedContent = targetStr.substring(0, substring.length)
            result.remainingContent = targetStr.substring(substring.length - 1)
        }
    } else {
        result.startIndex = startIndex
        result.length = targetStr.length
        result.consumedContent = targetStr
    }

    return result
};

/**
 * 剔除字符串中的字符
 */
export const excludeChar = (content: string) => {
    return content.replace(/\n+/g, "");
};

export const adjustStrByLength = (str1: string, str2: string) => {
    return str1.length < str2.length ? {shorterStr: str1, longerStr: str2} : {
        shorterStr: str2,
        longerStr: str1
    }
}
export const findCommonStrByLonger = (str1: string, str2: string) => {
    const {shorterStr, longerStr} = adjustStrByLength(str1, str2);
    return findCommonStrByFirstStr(longerStr, shorterStr);
}

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
            substring: '',
            length: 0
        };
    }
}

/**
 * (1, 4, 2, 5]) => [2,4]
 */
export const getIntersectionByIndex = (startIndex: number, endIndex: number, targetStartIndex: number, targetEndIndex: number) => {
    if (startIndex > endIndex || targetStartIndex > targetEndIndex) {
        console.log("下标错误");
        return [-1, -1];
    }

    const startOffset = startIndex < targetStartIndex ? 0 : startIndex - targetStartIndex;
    const length = targetEndIndex < endIndex ? targetEndIndex - targetStartIndex - startOffset : endIndex - targetStartIndex;
    return [startOffset, length];
};

export const inRange = (index: number, ranges: number[][]) => {
    for (const range of ranges) {
        if (index >= range[0] && index <= range[0] + range[1]) {
            return true
        }
    }
    return false
}