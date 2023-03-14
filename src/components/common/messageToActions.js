/*
Extract the basic params from the answerText
*/
export const extractParameters = (answerText) => {
    const matches = answerText.split('Parameters Start');

    let rawParams = null;
    let reportIntend = null;
    if (matches.length > 1) {
        reportIntend = matches[0].trim();
        rawParams = matches[1].trim();
    }

    return {
        rawParams,
        reportIntend
    };
};


/*

Output:

{
    queryText: 'the SOQL query'
    metric: 'The metric detected'
}
*/

export const paramsToSoql = (rawParams) => {
    let queryText = null;
    let metric = null;

    const queryObject = {};

    const params = rawParams.split('\n');

    if (params[0].indexOf('=') >= 0) {
        params.forEach((param) => {
            const [key, value] = param.split('=');
            queryObject[key.trim()] = value.trim().replaceAll('\'', '');
        })
    }

    if (queryObject.metric && queryObject.metric !== 'NA' && queryObject.group_by && queryObject.group_by !== 'NA') {

        metric = queryObject.metric;
        const metricParam = queryObject.metric === 'revenue'
            ? 'sum(price__c)'
            : 'count(quantity__c)';

        const groupByParam = queryObject.group_by.indexOf('CALENDAR') >= 0
            ? queryObject.group_by.replace('()', '(order_date__c)')
            : queryObject.group_by;

        const whereParams = [];
        const orderByParams = []

        if (queryObject.continent && queryObject.continent !== 'NA') {
            whereParams.push(`continent__c = '${queryObject.continent}'`);
        }

        if (queryObject.country && queryObject.country !== 'NA') {
            whereParams.push(`country__c = '${queryObject.country}'`);
        }

        if (queryObject.city && queryObject.city !== 'NA') {
            whereParams.push(`city__c = '${queryObject.city}'`);
        }

        if (queryObject.product_cat && queryObject.product_cat !== 'NA') {
            whereParams.push(`product_cat__c = '${queryObject.product_cat}'`);
        }

        if (queryObject.start_date && queryObject.start_date !== 'NA') {
            whereParams.push(`order_date__c >= ${queryObject.start_date}`);
        }

        if (queryObject.end_date && queryObject.end_date !== 'NA') {
            whereParams.push(`order_date__c < ${queryObject.end_date}`);
        }

        if (queryObject.order_by && queryObject.order_by !== 'NA') {
            orderByParams.push(`${queryObject.order_by}`);
        }
        orderByParams.push(metricParam);

        const whereText = whereParams.length
            ? `WHERE ${whereParams.join(' AND ')}`
            : ''

        const groupByParamSelect = groupByParam
            .replace('CALENDAR_MONTH(order_date__c)', 'CALENDAR_MONTH(order_date__c) month')
            .replace('CALENDAR_QUARTER(order_date__c)', 'CALENDAR_QUARTER(order_date__c) quarter')
            .replace('CALENDAR_YEAR(order_date__c)', 'CALENDAR_YEAR(order_date__c) year');

        queryText = `
            SELECT ${groupByParamSelect}, ${metricParam} ${queryObject.metric} FROM Order__c
                ${whereText}
                GROUP BY ${groupByParam} 
                ORDER BY ${orderByParams.join(', ')}`;
    }

    return queryText
        ? {
            queryText,
            metric
        }
        : null;
};