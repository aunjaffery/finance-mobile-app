import moment from "moment";
import { Box, Flex, useColorModeValue } from "native-base";
import React, { useState } from "react";
import * as scale from "d3-scale";
import { Grid, YAxis, BarChart, XAxis } from "react-native-svg-charts";
import { G, Rect, Text as SvgText } from "react-native-svg";
import { formatCash } from "../../services/helper";

const BarGraphComp = ({ gdata, type, gHeight }) => {
  const fcolor = "#818cf8";
  const txtColor = useColorModeValue("black", "white");
  const gridColor = useColorModeValue("#e4e4e7", "#1f2937");
  const [selected, setSelected] = useState(null);

  const handlePress = (s, index) => {
    s.index = index;
    if (index === selected?.index) {
      setSelected(null);
      return;
    }
    setSelected(s);
  };

  const data = gdata?.map((s, index) => ({
    ...s,
    index,
    svg: {
      fillOpacity: selected?.id === s.id ? 1 : 0.2,
      onPress: () => handlePress(s, index),
    },
  }));

  const Labels = ({ x, y }) => {
    let caly = Math.max(0, y(selected.sum) - 50);
    let calx = Math.max(0, x(selected.index) - 25);
    return (
      <G key={selected.id} x={calx} y={caly} onPress={() => setSelected(null)}>
        <Rect width="50" height="50" fill="#27272a" />
        <SvgText
          x="25"
          y="20"
          fill={fcolor}
          fontSize="12"
          textAnchor="middle"
          fontWeight="bold"
        >
          {`${moment(selected.date).format(
            type === "year" ? "MMM YYYY" : "DD MMM"
          )}`}
        </SvgText>
        <SvgText
          x="25"
          y="40"
          fill="white"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
        >
          {`${formatCash(selected.sum)}`}
        </SvgText>
      </G>
    );
  };
  return (
    <Flex
      direction="row"
      flex={1}
      borderColor="purple.400"
      borderWidth={0}
      minH="500"
    >
      <Box borderWidth={0} ml="4">
        <YAxis
          style={{ height: gHeight, borderWidth: 0, borderColor: "orange" }}
          data={gdata}
          numberOfTicks={6}
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
      <Box borderWidth={0} borderColor="red.400" flex={1}>
        <BarChart
          animate={true}
          animationDuration={300}
          yMin={0}
          style={{
            height: gHeight,
            borderColor: "green",
            borderWidth: 0,
            width: "100%",
          }}
          data={data}
          xAccessor={({ item }) => item.date}
          yAccessor={({ item }) => item.sum}
          svg={{
            fill: fcolor,
            stroke: fcolor,
            strokeWidth: 1,
            fillOpacity: 0.2,
          }}
          spacingInner={0.2}
          contentInset={{ top: 10, left: 10, bottom: 10, right: 10 }}
          numberOfTicks={6}
        >
          <Grid svg={{ stroke: gridColor }} />
          {selected?.sum && <Labels />}
        </BarChart>
        <XAxis
          data={data}
          style={{ height: 30, borderWidth: 0 }}
          svg={{
            fill: txtColor,
            fontSize: 10,
            fillOpacity: 1,
          }}
          numberOfTicks={6}
          xAccessor={({ item }) => moment(item.date).toDate()}
          scale={scale.scaleLinear}
          formatLabel={(value) => {
            return moment(value).format(type === "year" ? "MMM YY" : "D MMM");
          }}
          contentInset={{
            left: type === "year" ? 10 : 10,
            right: type === "year" ? 36 : 20,
          }}
        />
      </Box>
    </Flex>
  );
};
export default BarGraphComp;
