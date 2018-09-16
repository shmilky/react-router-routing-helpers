import {parse as queryStringParser, stringify} from 'query-string';

function parseQueryString (queryStr) {
    try {
        return queryStringParser(queryStr);
    }
    catch (e) {
        console.error(`internal react-router-routing-helpers error in parseQueryString for received input ${queryStr} - ${e}`);

        return {};
    }

}

function arrayToCommaSeparatedString(array, extractor) {
    let result = "";

    if(!array.length) {
        return result;
    }

    result += extractor(array[0]);

    for(let i=1; i<array.length; i++) {
        result += ',';
        result += extractor(array[i]);
    }

    return result;
}

function objToQueryParams(sourceObject) {
    if (!sourceObject) {
        return '';
    }

    const resultObject = {};

    for(const key of Object.keys(sourceObject)) {
        if (!sourceObject.hasOwnProperty(key)) {
            continue;
        }

        const item = sourceObject[key];
        if(!item) {
            continue;
        }

        if(Array.isArray(item)) {
            if(!item.length) {
                continue;
            }

            resultObject[key] = arrayToCommaSeparatedString(item, x => x);
        }
        else {
            resultObject[key] = item;
        }

    }
    return stringify(resultObject);
}

function toObjectWithNoNullOrEmptyKeys (obj) {
    const newObj = {};

    Object.keys(obj).forEach( function (key) {
        if (obj[key] !== null && obj[key] !== undefined){
            newObj[key] = obj[key];
        }
    });

    return newObj;
}

function addQueryParam(path, currQueryStr, newParams) {
    const currQueryParams = parseQueryString(currQueryStr);
    const updatedQueryParams = toObjectWithNoNullOrEmptyKeys(Object.assign(currQueryParams, newParams));
    const queryStr = objToQueryParams(updatedQueryParams);

    return path + (queryStr.length > 0 ? '?' + queryStr : '');
}

export default {
    addQueryParam,
    objToQueryParams,
    parseQueryString,
    arrayToCommaSeparatedString
};
