import React from 'react';
import PropTypes from "prop-types";
import { Chart } from 'react-charts';
import Grid from '@mui/material/Grid';

const BarChart = ({ chartData }) => {

    console.log('sky debug 5001 data is ', chartData);
    console.log('sky debug 5002 primary is ', chartData.primary);
    console.log('sky debug 5003 secondary is ', chartData.secondary);

    const primaryAxis = chartData.primary && React.useMemo(
        () => ({
            getValue: datum => datum[chartData.primary],
        }),
        []
    )

    console.log('sky debug 5004 primaryAxis is ', primaryAxis);


    const secondaryAxes = chartData.secondary.map((secondaryKey) => {
            return {
                getValue: datum => datum[secondaryKey],
                elementType: 'bar',
                min: 0
            };
        });

    console.log('sky debug 5006 secondaryAxes is ', secondaryAxes);

    return (
        chartData.data && primaryAxis && secondaryAxes && secondaryAxes.length && <Grid item xs={12} sm={12} sx={{ height: 200 }}>
            <Chart
                options={{
                    data: chartData.data,
                    primaryAxis,
                    secondaryAxes,
                }}
            />
        </Grid>
    );
}

// BarChart.propTypes = {
//     data: PropTypes.array.isRequired,
//     primary: PropTypes.string.i,
//     secondary: PropTypes.array.isRequired
//   };

export default BarChart;