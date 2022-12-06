import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';

import './Chart.css';

const Chart = ({ title = '', data = {}, width = 100, height = 100, margin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40
} }) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = (d) => d.label;
  const y = (d) => +d.value;

  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: data.map(x),
    padding: 0.4
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(y))]
  });


  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  const compose = (scale, accessor) => (data) => scale(accessor(data));
  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);

  if (width < 10 && height < 10) {
    return <div />
  }

  return (
    <div className="Chart">
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>

          {!!title && <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
            {title}
          </text>}

          <GridRows scale={yScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={xScale} width={xMax} height={yMax} stroke="#e0e0e0" />

          <AxisBottom scale={xScale} top={yMax} numTicks={data.length} />
          <AxisLeft
            scale={yScale}
          />

          {data.map((d, i) => {
            const barHeight = yMax - yPoint(d);
            return (
              <Group key={`bar-${i}`}>
                <Bar
                  className="bar"
                  x={xPoint(d)}
                  y={yMax - barHeight}
                  height={barHeight}
                  width={xScale.bandwidth()}
                  fill="#fc2e1c"
                />
              </Group>
            );
          })}
        </Group>
      </svg>
    </div>
  );
};

export default Chart;
