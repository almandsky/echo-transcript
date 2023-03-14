import React from 'react';
import PropTypes from "prop-types";
import { Chart } from 'react-charts';
import Grid from '@mui/material/Grid';

const BarChart = ({ chartData }) => {

    const primaryAxis = chartData.primary && React.useMemo(
        () => ({
            getValue: datum => datum[chartData.primary],
        }),
        []
    )

    const secondaryAxes = chartData.secondary.map((secondaryKey) => {
        return {
            getValue: datum => datum[secondaryKey],
            elementType: 'bar',
            min: 0
        };
    });

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

BarChart.propTypes = {
    chartData: PropTypes.object.isRequired
};

export default BarChart;
