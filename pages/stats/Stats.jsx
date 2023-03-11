import { Box, Text, useColorModeValue } from "native-base";
import { useState } from "react";
import { Dimensions, View } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { globalTheme } from "../../services/theme";
import { Rect, Svg, Text as TextSVG } from "react-native-svg";

const Stats = () => {
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 100, 40, 60, 28, 80, 100, 40, 60],
      },
    ],
  };
  const bg = useColorModeValue(
    globalTheme.light.primary,
    globalTheme.dark.primary
  );
  const labelColor = useColorModeValue("black", "white");
  const lineColor = "#818cf8";
  const borderColor = useColorModeValue(
    globalTheme.light.secondary,
    globalTheme.dark.secondary
  );
  return (
    <Box px="0" mt="4">
      <Box borderColor={borderColor} borderWidth={0} mt="6" pt="5">
        <LineChart
          style={{
            marginBottom: 15,
            borderRadius: 0,
          }}
          bezier
          data={data}
          width={Dimensions.get("window").width - 10}
          height={220}
          yAxisLabel="$"
          withInnerLines={false}
          verticalLabelRotation={40}
          chartConfig={{
            backgroundGradientFrom: bg,
            backgroundGradientTo: bg,
            decimalPlaces: 0,
            color: () => lineColor,
            labelColor: () => labelColor,
            style: { borderRadius: 0 },
            propsForDots: {
              r: "4",
            },
            strokeWidth: 1,
          }}
          decorator={() => {
            return tooltipPos.visible ? (
              <View>
                <Svg>
                  <Rect
                    x={tooltipPos.x - 15}
                    y={tooltipPos.y + 10}
                    width="40"
                    height="30"
                    fill="black"
                  />
                  <TextSVG
                    x={tooltipPos.x + 5}
                    y={tooltipPos.y + 30}
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {tooltipPos.value}
                  </TextSVG>
                </Svg>
              </View>
            ) : null;
          }}
          onDataPointClick={(data) => {
            let isSamePoint =
              tooltipPos.x === data.x && tooltipPos.y === data.y;
            isSamePoint
              ? setTooltipPos({
                  ...tooltipPos,
                  visible: !tooltipPos.visible,
                })
              : setTooltipPos({
                  x: data.x,
                  value: data.value,
                  y: data.y,
                  visible: true,
                });
          }}
        />
      </Box>
    </Box>
  );
};

export default Stats;
