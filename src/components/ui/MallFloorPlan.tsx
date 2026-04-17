"use client";

import { useCallback, useState } from "react";
import {
  FLOOR_UNITS,
  type FloorId,
  type StoreUnit,
} from "@/lib/mall-unit-data";

const FLOORS: readonly {
  readonly id: FloorId;
  readonly label: string;
  readonly title: string;
}[] = [
  { id: "3347", label: "T", title: "Transit / Below Ground" },
  { id: "1804", label: "1", title: "Level 1" },
  { id: "1805", label: "2", title: "Level 2" },
  { id: "1806", label: "3", title: "Level 3" },
  { id: "1807", label: "4", title: "Level 4" },
];

const FLOOR_GROUPS: Record<string, FloorId[]> = {
  retail: ["1804", "1805", "1806"],
  allLevels: ["1804", "1805", "1806", "1807"],
  level3: ["1806"],
  transit: ["3347"],
};

function buildShow(floor: FloorId) {
  return Object.fromEntries(
    Object.entries(FLOOR_GROUPS).map(([k, ids]) => [k, ids.includes(floor)]),
  ) as Record<keyof typeof FLOOR_GROUPS, boolean>;
}

const FLOOR_ACCENT: Record<FloorId, string> = {
  "3347": "100,149,237",
  "1804": "199,153,85",
  "1805": "134,194,156",
  "1806": "178,132,190",
  "1807": "219,176,102",
};

function displayOf(v: boolean) {
  return v ? ("block" as const) : ("none" as const);
}

function MapLabels({ floor }: { readonly floor: FloorId }) {
  const s = buildShow(floor);
  return (
    <g id="map_labels" {...{ [`lvl-${floor}`]: "1" }}>
      <text
        x="675"
        y="1050"
        fontSize="8"
        fill="rgba(255,255,255,0.5)"
        textAnchor="middle"
        style={{ display: displayOf(s.allLevels) }}
      >
        West Parking
      </text>
      <text
        x="1006"
        y="1050"
        fontSize="8"
        fill="rgba(255,255,255,0.5)"
        textAnchor="middle"
        style={{ display: displayOf(s.allLevels) }}
      >
        East Parking
      </text>
      <text
        x="928"
        y="1020"
        fontSize="6"
        fill="rgba(199,153,85,0.8)"
        textAnchor="middle"
        style={{ display: displayOf(s.retail) }}
      >
        Rotunda
      </text>
      <text
        x="848"
        y="945"
        fontSize="6"
        fill="rgba(199,153,85,0.8)"
        textAnchor="middle"
        style={{ display: displayOf(s.level3) }}
      >
        N. Food Court
      </text>
      <text
        x="862"
        y="1000"
        fontSize="7"
        fill="rgba(199,153,85,0.9)"
        textAnchor="middle"
        style={{ display: displayOf(s.retail) }}
      >
        Nick Universe
      </text>
      <text
        x="752"
        y="1148"
        fontSize="6.5"
        fill="rgba(255,255,255,0.7)"
        textAnchor="middle"
        style={{ display: displayOf(s.retail) }}
      >
        Macy&apos;s
      </text>
      <text
        x="758"
        y="972"
        fontSize="6.5"
        fill="rgba(255,255,255,0.7)"
        textAnchor="middle"
        style={{ display: displayOf(s.retail) }}
      >
        Nordstrom
      </text>
      <text
        x="915"
        y="920"
        fontSize="6"
        fill="rgba(255,255,255,0.6)"
        textAnchor="middle"
      >
        JW Marriott
      </text>
      <text
        x="875"
        y="1172"
        fontSize="6"
        fill="rgba(255,255,255,0.6)"
        textAnchor="middle"
        style={{ display: displayOf(s.allLevels) }}
      >
        Radisson BLU
      </text>
      <text
        x="1009"
        y="1005"
        fontSize="6.5"
        fill="rgba(199,153,85,0.8)"
        textAnchor="middle"
        style={{ display: displayOf(s.transit) }}
      >
        Transit Center
      </text>
      <text
        x="928"
        y="1010"
        fontSize="6.5"
        fill="rgba(199,153,85,0.8)"
        textAnchor="middle"
        style={{ display: displayOf(s.transit) }}
      >
        SEA LIFE
      </text>
    </g>
  );
}

export default function MallFloorPlan() {
  const [floor, setFloor] = useState<FloorId>("1804");
  const [selected, setSelected] = useState<StoreUnit | null>(null);
  const accent = FLOOR_ACCENT[floor];
  const units = FLOOR_UNITS[floor];

  const switchFloor = useCallback((id: FloorId) => {
    setFloor(id);
    setSelected(null);
  }, []);

  const handleUnitClick = useCallback(
    (unit: StoreUnit) =>
      setSelected((prev) => (prev?.name === unit.name ? null : unit)),
    [],
  );

  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-4">
        <span className="text-[var(--moa-muted)] text-xs mr-2 uppercase tracking-widest">
          Level
        </span>
        {FLOORS.map((f) => (
          <button
            key={f.id}
            onClick={() => switchFloor(f.id)}
            title={f.title}
            className={[
              "w-8 h-8 text-xs font-medium rounded-[2px] border transition-all duration-200",
              floor === f.id
                ? "bg-[var(--gold)] border-[var(--gold)] text-black"
                : "border-white/20 text-[var(--moa-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)]",
            ].join(" ")}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-3 text-[var(--moa-muted)] text-xs">
          {FLOORS.find((f) => f.id === floor)?.title}
        </span>
      </div>

      <div className="rounded-[2px] overflow-hidden bg-[var(--moa-card)] border border-white/5">
        <svg
          viewBox="640 880 400 300"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-64 md:h-80"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Mall of America interactive floor plan"
        >
          <style>{`
            .moa-boundary { fill: rgba(255,255,255,0.03); stroke: rgba(${accent},0.6); stroke-width: 0.6;
                            transition: stroke 0.35s; }
            .moa-parking  { fill: rgba(255,255,255,0.06); stroke: rgba(255,255,255,0.1); stroke-width: 0.4; }
            .moa-unit     { fill: rgba(${accent},0.08); stroke: rgba(${accent},0.22); stroke-width: 0.3;
                            transition: fill 0.25s, stroke 0.25s, stroke-width 0.2s; cursor: pointer; }
            .moa-unit:hover { fill: rgba(${accent},0.4); stroke: rgba(${accent},0.9); stroke-width: 0.6; }
            .moa-selected  { fill: rgba(${accent},0.55); stroke: rgb(${accent}); stroke-width: 0.8;
                             filter: drop-shadow(0 0 4px rgba(${accent},0.6)); pointer-events: none; }
          `}</style>

          <g id="Boundary">
            <polygon
              className="moa-boundary"
              points="804.048,904.703 804.038,910.022 798.387,910.009 798.373,915.899 797.042,915.892 797.032,922.15 798.358,922.15 798.344,928.082 809.67,928.109 809.641,944.692 832.322,944.747 832.293,957.534 784.578,957.425 780.272,953.603 767.567,941.107 766.275,942.366 760.373,936.366 760.378,934.775 757.731,932.115 756.144,932.115 754.688,930.653 754.423,930.918 751.096,927.578 740.271,927.551 736.998,930.816 736.732,930.544 735.271,932 733.68,932 731.023,934.639 731.023,936.23 719.336,947.869 717.745,947.862 715.088,950.508 715.083,952.099 713.622,953.555 714.683,954.616 710.097,959.18 710.078,968.982 711.732,970.642 710.666,971.703 725.802,986.892 743.729,986.926 745.103,988.177 745.093,993.762 721.944,993.714 721.737,1087.18 737.374,1087.214 737.359,1092.846 736.617,1092.846 733.015,1096.424 732.798,1096.213 725.286,1096.193 697.484,1123.87 698.718,1125.108 697.199,1126.625 711.081,1140.569 709.104,1142.542 736.867,1170.43 738.96,1168.349 741.327,1170.729 743.42,1168.648 745.787,1171.022 747.88,1168.94 750.247,1171.321 752.34,1169.24 754.708,1171.62 756.569,1169.77 758.42,1171.627 773.295,1156.819 771.444,1154.962 781.67,1144.78 779.824,1142.916 783.536,1139.216 785.388,1141.073 790.769,1135.713 792.958,1133.597 794.747,1131.74 843.846,1131.849 843.851,1129.836 854.41,1129.863 854.405,1131.876 906.349,1131.992 914.266,1139.95 919.045,1135.719 922.965,1139.692 919.382,1143.317 923.423,1147.385 923.871,1147.834 926.186,1147.841 933.1,1154.785 936.258,1157.962 936.287,1160.336 940.839,1164.914 944.407,1161.2 946.943,1163.744 949.489,1161.213 953.235,1164.975 961.823,1156.248 961.827,1153.772 960.902,1152.847 970.993,1142.793 971.958,1143.766 974.354,1143.773 983.361,1134.951 979.672,1131.25 982.078,1128.836 979.547,1126.292 983.178,1122.714 978.645,1118.163 976.244,1118.143 971.235,1113.116 972.372,1112.048 969.802,1109.47 970.314,1108.96 962.122,1100.73 957.469,1105.369 953.496,1101.349 953.51,1095.594 963.602,1095.622 963.833,994.353 948.081,994.319 948.09,988.728 952.898,988.735 980.666,959.813 946.47,925.272 915.308,955.881 913.635,957.779 877.14,957.698 877.154,952.106 894.69,952.147 908.138,952.174 908.23,911.696 906.074,911.689 906.074,910.539 902.863,910.532 902.873,904.921 872.679,904.853 872.737,879.352 841.31,879.277 841.252,904.785"
            />
            <polygon
              className="moa-boundary"
              points="820.687,1142.487 820.601,1181.476 900.346,1181.653 900.438,1142.664 872.385,1142.603 872.356,1156.833 871.503,1156.826 871.489,1162.438 872.342,1162.438 872.337,1165.832 852.129,1165.784 852.183,1142.555"
            />
          </g>

          <g id="Parking">
            <polygon
              className="moa-parking"
              points="803.802,876.094 807.698,877.223 828.026,877.264 841.31,879.277 896.581,879.407 901.238,877.488 904.946,874.89 906.624,871.428 908.307,867.02 908.562,858.905 908.943,848.165 910.747,842.2 911.359,836.595 911.489,830.507 912.217,825.018 914.146,816.672 914.994,810.223 914.165,807.72 913.215,806.523 911.668,805.564 804.853,806.04 794.467,807.924 788.016,810.659 796.738,850.342 797.457,867.571 798.088,869.918 799.178,872.026 800.687,873.883 802.076,875.155"
            />
            <polygon
              className="moa-parking"
              points="1080.957,1033.785 1079.958,1035.73 1079.713,1038.077 1078.208,1194.706 1136.922,1194.836 1137.086,1121.592 1229.816,1121.802 1228.345,1138.073 1228.177,1143.678 1228.37,1145.752 1229.001,1146.868 1230.631,1147.548 1232.102,1147.909 1276.418,1148.004 1277.985,1147.562 1278.896,1146.875 1279.421,1145.861 1279.745,1144.61 1279.981,1038.532 1279.759,1037.016 1279.161,1035.574 1278.091,1034.54 1276.557,1033.635 1274.769,1033.091 1272.898,1032.941 1083.821,1032.519 1082.389,1032.832"
            />
            <polygon
              className="moa-parking"
              points="671.746,794.524 671.717,809.298 660.463,809.271 660.391,842.213 663.684,845.757 671.9,854.13 682.556,857.64 733.401,857.756 733.526,803.034 715.252,802.993 715.271,794.626"
            />
            <polygon
              className="moa-parking"
              points="640.434,944.495 640.019,1130.495 673.969,1130.577 673.988,1123.176 697.701,1099.186 700.353,1096.553 707.658,1089.173 707.875,991.605 674.566,958.058 674.595,944.57"
            />
            <polygon
              className="moa-parking"
              points="1006.052,964.119 975.111,995.088 975.106,998.659 972.3,998.652 972.098,1088.643 974.523,1088.65 974.518,1092.425 1005.695,1123.748 1005.666,1136.815 1038.728,1136.889 1039.182,934.877 1006.119,934.802"
            />
          </g>

          <g id="Units">
            {units.map((unit) => (
              <polygon
                key={unit.name}
                className={`moa-unit${selected?.name === unit.name ? " moa-selected" : ""}`}
                points={unit.pts}
                onClick={() => handleUnitClick(unit)}
              >
                <title>{unit.name}</title>
              </polygon>
            ))}
          </g>

          <MapLabels floor={floor} />
        </svg>
      </div>

      {selected && (
        <div className="mt-2 flex items-center justify-between rounded-[2px] border border-white/10 bg-[var(--moa-surface)] px-3 py-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: `rgb(${accent})` }}
            />
            <span className="text-sm font-medium text-white">
              {selected.name}
            </span>
            <span className="text-xs text-[var(--moa-muted)]">
              {FLOORS.find((f) => f.id === floor)?.title}
            </span>
          </div>
          <button
            onClick={() => setSelected(null)}
            className="text-xs text-[var(--moa-muted)] transition-colors hover:text-white"
            aria-label="Deselect store"
          >
            ✕
          </button>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <p className="text-[var(--moa-muted)] text-xs">
          {units.length} stores on this level
        </p>
        <a
          href="https://www.mallofamerica.com/directory"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--gold)] text-xs hover:underline"
        >
          Full interactive directory ↗
        </a>
      </div>
    </div>
  );
}
