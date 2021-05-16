
<script>
    export let data;
    export let image;
    import * as d33 from "d3";
    import { dev } from "$app/env";

    let d3;
    if (dev) {
        d3 = d33;
    } else {
        d3 = d33.default;
    }

    data = d3.csvParse(data);

    
    const height = 320
    const width = 640
    const strokeWidth = 8;
    const margin = ({top: 40, right: 30, bottom: 100, left: 40})
    const x = d3.scaleLinear()
        .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
        .range([margin.left, width - margin.right])
    const y = d3.scaleLinear()
        .domain([-1, 1])
        .range([height - margin.bottom, margin.top])
    const acc_x_line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.l_acc_x))
    const acc_y_line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.l_acc_y))
    const acc_z_line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.l_acc_z))
    
    const r_acc_x_line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.r_acc_x))
    const r_acc_y_line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.r_acc_y))
    const r_acc_z_line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.r_acc_z))
</script>

<div class='text'><pre><span class='blue'>Wash</span>
    <span class='gold'>&#8201;hands</span> regularly:</pre></div>
<div class="graph">
    <div class='signal'>
        <svg viewBox="0 0 {width} {height}">
            <path d="{acc_x_line(data)}" fill="none" stroke="steelblue" stroke-width="{strokeWidth}" stroke-miterlimit="1"></path>
            <path d="{acc_y_line(data)}" fill="none" stroke="gold" stroke-width="{strokeWidth}" stroke-miterlimit="1"></path>
            <path d="{acc_z_line(data)}" fill="none" stroke="indianred" stroke-width="{strokeWidth}" stroke-miterlimit="1"></path>
        </svg>
    </div>
    <img src="{image}" alt="">
    <div class='signal'>
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
        margin: 0 auto;
	}

    div.graph {
        display: flex;
    }

    div.signal {
        margin-top: 40px;
    }

    div.text {
        font-size: 24px;
        margin: 0;
        color: forestgreen;
    }

    div.text pre {
        margin: 0;
    }

    div.text span.blue {
        color: steelblue;
    }

    div.text span.gold {
        color: goldenrod;
    }

    @media only screen and (max-width: 600px) {
        div.signal {
            margin-top: 30px;
        }
    }

    div.graph img {
        width: 25%;
        height: auto;
        flex: 1;
        box-shadow: none;
    }
</style>