import {BarSeries, Tooltip, ChartProvider, XAxis, Rectangle} from 'rough-charts';
import * as d3Scale from 'd3-scale'
import {colors} from './../../config'

const ChartComponent = ({stats}) => {

    const data = stats.map((item) => ({name: item.stat.name, value: item.base_stat}));

    const yScale = d3Scale.scaleLinear().domain([0, 200]);

    return (
        <>
            <ChartProvider
                height={300}
                data={data}
                yScale={yScale}
                margin={{
                    bottom: 40,
                    left: 10,
                    right: 10,
                    top: 10
                }}
            >
                <XAxis
                    dataKey="name"
                    fontSize={16}
                    tickCount={10}
                    tickSize={10}
                />
                <BarSeries
                    dataKey="value"
                    options={{
                        fill: '#ee4035'
                    }}
                >
                    {(item, ItemProps, index) => (
                        <Rectangle
                            {...ItemProps}
                            key={index}
                            options={{
                                fillStyle: 'solid',
                                fill: colors[index],
                            }}
                        />
                    )}
                </BarSeries>
                <Tooltip />
            </ChartProvider>
        </>
    );
}

export default ChartComponent;