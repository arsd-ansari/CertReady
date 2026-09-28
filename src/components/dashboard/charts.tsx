"use client";

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const NAVY = "#0b1f4d";
const BLUE = "#1b6fd6";
const GREEN = "#16a34a";
const AMBER = "#f59e0b";

export function ScoreTrendChart({ data }: { data: { date: string; score: number; exam: string }[] }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid stroke="#eef0f3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
            formatter={(value) => [`${value}%`, "Score"]}
            labelFormatter={(label, payload) => `${label} · ${payload?.[0]?.payload?.exam ?? ""}`}
          />
          <Line type="monotone" dataKey="score" stroke={BLUE} strokeWidth={2.5} dot={{ r: 4, fill: NAVY, strokeWidth: 0 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryBarChart({ data }: { data: { name: string; pct: number }[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 24, bottom: 0, left: 8 }}>
          <CartesianGrid stroke="#eef0f3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11, fill: "#374151" }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(value) => [`${value}%`, "Accuracy"]} cursor={{ fill: "#f3f4f6" }} />
          <Bar dataKey="pct" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.pct >= 70 ? GREEN : AMBER} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
