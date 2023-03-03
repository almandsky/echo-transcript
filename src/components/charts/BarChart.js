import React from 'react';
import { Chart } from 'react-charts';
import Grid from '@mui/material/Grid';

const BarChart = ({ data }) => {
    console.log('sky debug 1001 data is ', data);

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

export default BarChart;