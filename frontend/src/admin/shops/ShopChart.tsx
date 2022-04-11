
import { Box, Card, CardHeader } from '@mui/material';
import { SaleType } from '@src/types/sale';
import BaseOptionChart from '@theme/charts';
import { ApexOptions } from 'apexcharts';
import { format, isSameDay } from 'date-fns';
import merge from 'deepmerge';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ----------------------------------------------------------------------

interface Props {
    sales: SaleType[]
}

const week = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d
})

const ShopChart = ({ sales }: Props) => {
    const salesDates = sales.map((sale) => new Date(sale.date))
    const numSalesPerDay = week.map((day) => salesDates.reduce(
        (previousValue, currentValue) => previousValue + (isSameDay(currentValue, day) ? 1 : 0),
        0
    ))

    const CHART_DATA = [
        {
            name: 'Antall kryss',
            type: 'area',
            data: numSalesPerDay
        },
    ];

    const chartOptions: ApexOptions = merge(BaseOptionChart(), {
        stroke: { width: 2 },
        plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
        fill: { type: ['gradient'] },
        labels: week.map(day => (format(day, "MM/dd/yyyy"))),
        xaxis: { type: 'datetime' },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y: any) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} kryss`;
                    }
                    return y;
                }
            }
        },
    });

    return (
        <Card>
            <CardHeader title="Statistikk" subheader="Kryssing de siste 7 dagene" />
            <Box sx={{ p: 3, pb: 1 }}>
                <Chart type="line" series={CHART_DATA} options={chartOptions} height={364} />
            </Box>
        </Card>
    );
}

export default ShopChart