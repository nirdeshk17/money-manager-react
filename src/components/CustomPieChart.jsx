import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded px-3 py-2 border text-sm">
        <p className="font-semibold">{payload[0].name}</p>
        <p>₹ {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  const chartData =
    total === 0
      ? [{ name: "No Data", amount: 1 }]
      : data.map((item) => ({
          name: item.name,
          amount: item.amount,
        }));

  return (
    <div className="w-full h-94 flex flex-col justify-center items-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="name"
            innerRadius={110}
            outerRadius={150}
            paddingAngle={2}
            stroke="#fff"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`slice-${index}`}
                fill={
                  colors
                    ? colors[index % colors.length]
                    : ["#591688", "#a0090e", "#016630"][index % 3]
                }
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {showTextAnchor && (
        <div className="absolute text-center pointer-events-none">
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-lg font-bold">{totalAmount}</p>
        </div>
      )}

      <div className="flex gap-4 mt-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor:
                  colors?.[index] ||
                  ["#591688", "#a0090e", "#016630"][index % 3],
              }}
            ></span>
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
