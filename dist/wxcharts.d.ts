export = WxChart;

interface ChartOpts {
    canvasId: string;
    width: number;
    height: number;
    background?: string;
    enableScroll?: boolean;
    title?: Title;
    subtitle?: Title;
    animation?: boolean;
    legend?: boolean;
    type: "pie" | "line" | "column" | "area" | "ring" | "radar";
    categories: string[];
    dataLabel?: boolean;
    dataPointShape?: boolean;
    disablePieStroke?: boolean;
    xAxis?: XAxis;
    yAxis?: YAxis;
    extra?: object;
    series: DataItem[];
}

interface Title {
    name?: string;
    fontSize?: number;
    color?: string;
    offsetX: number;
}

interface XAxis {
    gridColor?: string;
    fontColor?: string;
    disableGrid?: boolean;
    type?: "calibration";
}

interface YAxis {
    format?: Function;
    min?: number;
    max?: number;
    title?: string;
    gridColor?: string;
    fontColor?: string;
    titleFontColor?: string;
    disabled: boolean;
}

interface DataItem {
    data: any[];
    color?: string;
    name?: string;
    format?: Function;
}

interface Extra {
    ringWidth?: number;
    lineStyle?: "curve" | "stright";
    column?: Column;
    legendTextColor?: string;
    radar?: Radar;
    pie?: Pie;
}

interface Column {
    width?: number;
}

interface Radar {
    max?: number;
    labelColor?: string;
    gridColor?: string;
}

interface Pie {
    offsetAngle?: number;
}

declare class WxChart {
    constructor(opts: ChartOpts);

    updateData(data: {
        categories?: string[],
        series?: DataItem[],
        title?: Title,
        subtitle?: Title
    });
    stopAnimation();
    addEventListener(type: "renderComplete", listener: () => void);
    getCurrentDataIndex(e);
    showToolTip(e, options?: ShowToolTipOptions);
    scrollStart(e);
    scroll(e);
    scrollEnd(e);
}

interface ShowToolTipOptions {
    background?: string;
    format?: (seriesItem: SeriesItem, category: string) => string;
}

interface SeriesItem {
    name: string;
    data: number;
}
