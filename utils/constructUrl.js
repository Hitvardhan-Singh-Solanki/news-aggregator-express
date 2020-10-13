const url = (baseurl, endPoint, { queryString, startDate, endDate, sortFilter, domainFilter, language, country }, apiKey) => {
    let finalUrl = baseurl+`/${endPoint}`;

    finalUrl = new URL(finalUrl);

    if(queryString) {
        finalUrl.searchParams.append("q", queryString)
    }

    if(startDate && endDate) {
        finalUrl.searchParams.append("from", startDate);
        finalUrl.searchParams.append("to", endDate);
    }

    if(sortFilter) {
        finalUrl.searchParams.append("sortBy", sortFilter);
    }

    if(domainFilter) {
        finalUrl.searchParams.append("domain", domainFilter);
    }

    if(language) {
        finalUrl.searchParams.append("language", language);
    }

    if(country) {
        finalUrl.searchParams.append("country", country);
    }

    finalUrl.searchParams.append("apiKey",apiKey);

    return finalUrl.href;
}


module.exports = url