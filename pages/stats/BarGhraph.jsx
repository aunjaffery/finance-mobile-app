import moment from "moment";
import { Box, Flex, useColorModeValue } from "native-base";
import React, { useState } from "react";
import * as scale from "d3-scale";
import { Grid, YAxis, BarChart } from "react-native-svg-charts";
import { G, Rect, Text as SvgText } from "react-native-svg";
import { formatCash } from "../../services/helper";

const BarGraphComp = ({ gdata }) => {
  const fcolor = "#818cf8";
  const txtColor = useColorModeValue("black", "white");
  const gridColor = useColorModeValue("#e4e4e7", "#1f2937");
  const gHeight = 300;
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
      fill: selected?.id === s.id ? "#4f46e5" : fcolor,
      onPress: () => handlePress(s, index),
    },
  }));

  const Labels = ({ x, y }) => {
    let caly = Math.max(0, y(selected.sum) - 50);
    return (
      <G
        key={selected.id}
        x={x(selected.index) - 15}
        y={caly}
        onPress={() => setSelected(null)}
      >
        <Rect width="50" height="50" fill="#27272a" />
        <SvgText
          x="25"
          y="20"
          fill={fcolor}
          fontSize="12"
          textAnchor="middle"
          fontWeight="bold"
        >
          {`${moment(selected.date).format("DD MMM")}`}
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
    <Flex direction="row" flex={1} minH={gHeight}>
      <Box borderWidth={0} ml="4">
        <YAxis
          style={{ height: gHeight, borderWidth: 0 }}
          data={gdata}
          numberOfTicks={6}
          svg={{
            fill: txtColor,
            fontSize: 10,
          }}
          scale={scale.scaleSymlog}
          yAccessor={({ item }) => item.sum}
          contentInset={{ top: 10, bottom: 15, left: 10, right: 20 }}
          formatLabel={(value) => formatCash(value)}
        />
      </Box>
      <Box borderWidth={0} borderColor="red.400" flex={1}>
        <BarChart
          animate={true}
          animationDuration={1000}
          yMin={0}
          style={{
            height: gHeight,
            borderBottomWidth: 1,
            borderBottomColor: gridColor,
          }}
          data={data}
          xAccessor={({ item }) => item.date}
          yAccessor={({ item }) => item.sum}
          svg={{
            fill: fcolor,
          }}
          spacingInner={0.2}
          contentInset={{ top: 10, left: 10, right: 10 }}
          numberOfTicks={6}
        >
          <Grid svg={{ stroke: gridColor }} />
          {selected?.sum && <Labels />}
        </BarChart>
      </Box>
    </Flex>
  );
};
export default BarGraphComp;
