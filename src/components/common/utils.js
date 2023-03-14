import axios from 'axios';

export const formatMonth = (value) => {

    switch (value) {
        case 1: return 'January';
        case 2: return 'February';
        case 3: return 'March';
        case 4: return 'April';
        case 5: return 'May';
        case 6: return 'June';
        case 7: return 'July';
        case 8: return 'August';
        case 9: return 'September';
        case 10: return 'October';
        case 11: return 'November';
        case 12: return 'December';
        default: return value;
    }
};

export const formatRecord = (record) => {
    Object.keys(record).forEach((key) => {
        if (key === 'month') {
            record[key] = formatMonth(record[key]);
        } else if (key === 'quarter') {
            record[key] = `Q${record[key]}`;
        } else if (key === 'year') {
            record[key] = `${record[key]}`; // convert it to string
        }
    })
};

export const makeQuery = async (query) => {
    if (!query) {
        console.error('Empty query!');
        return;
    }

    const response = await axios.post('/query', {
        query
    });

    return response?.data;
};

export const genChartData = async (soqlQuery, metric) => {
    let finalOutput = null;

    const sourceData = await makeQuery(soqlQuery);

    if (sourceData && sourceData.records && sourceData.records.length) {
        let data = null;
        const { records: rawRecords } = sourceData;

        const records = rawRecords.map((rawRecord) => {
            formatRecord(rawRecord);
            return rawRecord;
        });

        const firstRecord = records[0];
        let primary = null;
        const secondary = [metric];
        const others = [];

        if (firstRecord.attributes.type !== 'AggregateResult') {
            console.log('This is not aggregation data, skip to process');
            return;
        }

        const availableKeys = Object.keys(firstRecord).filter((recordKey) => {
            return recordKey !== 'attributes'
        });

        if (availableKeys.length < 2) {
            console.log('There is not enough dimension in the data');
            return;
        }

        availableKeys.forEach((key) => {
            if (key.toLowerCase() !== metric.toLowerCase()) {
                if (typeof firstRecord[key] === 'string' && !primary) {
                    primary = key;
                } else {
                    others.push(key);
                }
            }
        });



        if (others.length) {
            const newDimension = others[0];
            const otherOthers = others.slice(1);
            const dataMap = {};

            sourceData.records.forEach((record) => {
                const newDimensionValue = record[newDimension];
                if (!dataMap[newDimensionValue]) {
                    dataMap[newDimensionValue] = [];
                }

                const output = {
                    [primary]: record[primary]
                };

                secondary.forEach((secondaryKey) => {
                    output[secondaryKey] = record[secondaryKey];
                });

                otherOthers.forEach((otherKey) => {
                    output[otherKey] = record[otherKey];
                });

                dataMap[newDimensionValue].push(output);
            });

            data = Object.keys(dataMap).map((key) => {
                return {
                    label: key,
                    data: dataMap[key]
                };
            });

        } else {
            const dataOneDimension = sourceData.records.map((record) => {
                const output = {
                    [primary]: record[primary]
                };

                secondary.forEach((secondaryKey) => {
                    output[secondaryKey] = record[secondaryKey];
                });

                others.forEach((otherKey) => {
                    output[otherKey] = record[otherKey];
                });

                return output;
            })

            data = [{
                label: metric,
                data: dataOneDimension
            }]
        }

        finalOutput = {
            data,
            primary,
            secondary
        };
    }

    return finalOutput;
}
