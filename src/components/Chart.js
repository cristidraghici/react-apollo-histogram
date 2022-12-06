import { useCallback } from 'react';
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

import './Chart.css';

// defining tooltip styles
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 10,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
};

const Chart = ({ title = '', data = {}, width = 100, height = 100, margin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40
} }) => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const handleMove = useCallback((event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x + 20,
      tooltipTop: coords.y,
      tooltipData: datum
    });
  }, [showTooltip]);

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

                  onMouseOver={(e) => handleMove(e, d.value)}
                  onTouchMove={(e) => handleMove(e, d.value)}
                  onMouseMove={(e) => handleMove(e, d.value)}
                  onMouseOut={hideTooltip}
                />
              </Group>
            );
          })}
        </Group>
      </svg>

      {tooltipOpen && (
        <TooltipWithBounds
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <strong>{tooltipData}</strong>
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default Chart;
