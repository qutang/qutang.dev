
const getSeriesName = function (id, data) {
    if (id) return data.series[id].name;
    else return "";
}

const getSeriesDescription = function (id, data) {
    if (id) return data.series[id].description;
    else return "";
}

export default { getSeriesName, getSeriesDescription }