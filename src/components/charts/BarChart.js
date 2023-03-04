import React from 'react';
import PropTypes from "prop-types";
import { Chart } from 'react-charts';
import Grid from '@mui/material/Grid';

const BarChart = ({ data }) => {

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
                elementType: 'bar',
                min: 0
            },
        ],
        []
    )

    return (
        data && <Grid item xs={12} sm={12} sx={{ height: 200 }}>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                }}
            />
        </Grid>
    );
}

BarChart.propTypes = {
    data: PropTypes.object.isRequired
  };

export default BarChart;