
<script>
    export let data;
    export let image;
    import { scaleLinear } from "d3-scale";
    import { csvParse } from "d3-dsv";
    import { line as d3Line } from "d3-shape";
    import { max as d3Max, min as d3Min } from "d3-array";
    // import d33 from "d3";
    import { dev, browser } from "$app/env";

    // let d3;
    // if (dev || browser) {
    //     d3 = d33;
    // } else {
    //     d3 = d33.default;
    // }

    data = csvParse(data);

    const height = 320
    const width = 640
    const strokeWidth = 8;
    const margin = ({top: 40, right: 30, bottom: 100, left: 40})
    const x = scaleLinear()
        .domain([d3Min(data, d => d.x), d3Max(data, d => d.x)])
        .range([margin.left, width - margin.right])
    const y = scaleLinear()
        .domain([-1, 1])
        .range([height - margin.bottom, margin.top])
    const acc_x_line = d3Line()
        .x(d => x(d.x))
        .y(d => y(d.l_acc_x))
    const acc_y_line = d3Line()
        .x(d => x(d.x))
        .y(d => y(d.l_acc_y))
    const acc_z_line = d3Line()
        .x(d => x(d.x))
        .y(d => y(d.l_acc_z))
    
    const r_acc_x_line = d3Line()
        .x(d => x(d.x))
        .y(d => y(d.r_acc_x))
    const r_acc_y_line = d3Line()
        .x(d => x(d.x))
        .y(d => y(d.r_acc_y))
    const r_acc_z_line = d3Line()
        .x(d => x(d.x))
        .y(d => y(d.r_acc_z))
</script>


<div class="graph">
    <div class='plot'>
        <svg viewBox="0 0 {width} {height}">
            <path d="{acc_x_line(data)}" fill="none" stroke="steelblue" stroke-width="{strokeWidth}" stroke-miterlimit="1"></path>
            <path d="{acc_y_line(data)}" fill="none" stroke="gold" stroke-width="{strokeWidth}" stroke-miterlimit="1"></path>
            <path d="{acc_z_line(data)}" fill="none" stroke="indianred" stroke-width="{strokeWidth}" stroke-miterlimit="1"></path>
        </svg>
    </div>
    <div class="plot">
        <img src="{image}" alt="">
    </div>
    <div class='plot'>
        <svg viewBox="0 0 {width} {height}">
            <path d="{r_acc_x_line(data)}" fill="none" stroke="steelblue" stroke-width="{strokeWidth}" stroke-miterlimit="1"></path>
            <path d="{r_acc_y_line(data)}" fill="none" stroke="gold" stroke-width="{strokeWidth}" stroke-miterlimit="1"></path>
            <path d="{r_acc_z_line(data)}" fill="none" stroke="indianred" stroke-width="{strokeWidth}" stroke-miterlimit="1"></path>
        </svg>
    </div>
</div>


<style>
	svg {
		width: 100%;
	}

    div.graph {
        display: flex;
    }

    div.plot {
        margin-top: 40px;
    }

    div.plot img {
        width: 160px;
        height: auto;
        box-shadow: none;
    }
</style>