import React from 'react';
import { Chart } from 'react-charts';

const BarChart = ({ data }) => {
    console.log('sky debug 1001 data is ', data);
    const formattedData = [
        {
            label: 'Revenue',
            data: [
                {
                    primary: 'New York',
                    secondary: 2535,
                },
                {
                    primary: 'Chicago',
                    secondary: 2919,
                },
                {
                    primary: 'Guangzhou',
                    secondary: 2996,
                },
                {
                    primary: 'Beijing',
                    secondary: 4627,
                },
                {
                    primary: 'Los Angeles',
                    secondary: 6488,
                }
            ]
        }
    ]

    const primaryAxis = React.useMemo(
        () => ({
            getValue: datum => datum.primary,
        }),
        []
    )

    const secondaryAxes = React.useMemo(
        () => [
            {
                getValue: datum => datum.secondary,
                elementType: 'bar'
            },
        ],
        []
    )

    return (
        data && <Chart
            options={{
                data,
                primaryAxis,
                secondaryAxes,
            }}
        />
    );
}

export default BarChart;