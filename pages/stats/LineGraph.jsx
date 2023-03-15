import moment from "moment";
import { Circle, Path } from "react-native-svg";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import * as scale from "d3-scale";
import { Box, Flex, useColorModeValue } from "native-base";
import { formatCash } from "../../services/helper";

const AreaChartScreen = ({ gdata }) => {
  const fcolor = "#818cf8";
  const txtColor = useColorModeValue("black", "white");
  const gridColor = useColorModeValue("#e4e4e7", "#1f2937");
  const gHeight = 300;

  const Dots = ({ x, y, data }) => {
    return (
      <>
        {data?.map((value, index) => {
          if (!value.sum) return;
          let cx = x(moment(value.date));
          let cy = y(value.sum);
          return (
            <Circle
              key={index}
              cx={cx}
              cy={cy}
              onPress={() => console.log("pressed!!!")}
              r={4}
              stroke={fcolor}
              fill={fcolor}
            />
          );
        })}
      </>
    );
  };
  return (
    <Flex direction="row" flex={1} minH={gHeight} borderColor={1}>
      <Box borderWidth={0} ml="4">
        <YAxis
          style={{ height: gHeight, borderWidth: 0 }}
          data={gdata}
          numberOfTicks={10}
          svg={{
            fill: txtColor,
            fontSize: 10,
          }}
          scale={scale.scaleSymlog}
          yAccessor={({ item }) => item.sum}
          contentInset={{ top: 10, bottom: 10, left: 10, right: 20 }}
          formatLabel={(value) => formatCash(value)}
        />
      </Box>
      <Flex borderWidth={0} borderColor="red.400" flex={1}>
        <LineChart
          style={{
            height: gHeight,
            borderWidth: 0,
            borderBottomColor: gridColor,
          }}
          data={gdata}
          xAccessor={({ item }) => moment(item.date)}
          yAccessor={({ item }) => item.sum}
          contentInset={{ top: 10, bottom: 10, left: 0, right: 10 }}
          curve={shape.curveMonotoneX}
          svg={{ stroke: fcolor, fill: fcolor, fillOpacity: 0.2 }}
        >
          <Grid svg={{ stroke: gridColor }} />
          <Dots />
        </LineChart>
        <XAxis
          style={{ borderWidth: 1, height: 50 }}
          data={gdata}
          svg={{
            fill: "black",
            fontSize: 10,
          }}
          xAccessor={({ item }) => item.date}
          formatLabel={(value) => moment(value).format("DD")}
        />
      </Flex>
    </Flex>
  );
};
export default AreaChartScreen;
