import { customMarked } from "./md-it";

export function jupyterRenderer(content) {
  let result;
  let jupyterDom = JSON.parse(content);
  content = jupyterDom2Markdown(jupyterDom);
  result = customMarked(content);
  return result;
}

function jupyterDom2Markdown(dom) {
  let result = [];
  dom["cells"].forEach((element) => {
    if (element["cell_type"] == "markdown") {
      if (element["source"].length > 0) {
        if (!element["source"][element["source"].length - 1].endsWith("\n")) {
          element["source"][element["source"].length - 1] += "\n";
        }
        result = result.concat(element["source"]);
      }
    } else if (element["cell_type"] == "code") {
      if (element["source"].length > 0) {
        if (!element["source"][element["source"].length - 1].endsWith("\n")) {
          element["source"][element["source"].length - 1] += "\n";
        }
        result.push("Input code\n");
        result.push("```python\n");
        result = result.concat(element["source"]);
        result.push("```\n");
        result.push("\n");
      }
      if (element["outputs"].length > 0) {
        let outputs = element["outputs"].map((output) => {
          if (output["output_type"] == "execute_result") {
            let key = Object.keys(output["data"])[0];
            let result = "";
            for (key in output["data"]) {
              if (key == "text/html") {
                result += "Output results\n";
                if (Array.isArray(output["data"][key])) {
                  result += output["data"][key].join("") + "\n\n";
                } else {
                  result += output["data"][key] + "\n\n";
                }
              } else if (key == "image/png") {
                result +=
                  "![" +
                  output["data"]["text/plain"] +
                  "](data:image/png;base64," +
                  output["data"]["image/png"] +
                  ")\n\n";
              } else {
                if (Array.isArray(output["data"][key])) {
                  result += "Output results\n";
                  result += "```\n";
                  result += output["data"][key].join("") + "\n";
                  result += "```\n";
                } else {
                  result += "Output results\n";
                  result += "```\n";
                  result += output["data"][key].toString() + "\n";
                  result += "```\n";
                }
              }
            }
            return result;
          } else if (output["output_type"] == "stream") {
            var text = output["text"];
            if (Array.isArray(text)) {
              return "Output results\n```\n" + text.join("") + "```\n\n";
            } else {
              return "Output results\n```\n" + text.toString() + "```\n\n";
            }
          } else if (output["output_type"] == "display_data") {
            return (
              "![" +
              output["data"]["text/plain"] +
              "](data:image/png;base64," +
              output["data"]["image/png"] +
              ")\n\n"
            );
          }
        });
        result = result.concat(outputs);
      }
    }
  });
  result = result.join("");
  return result;
}

// let content = fs.readFileSync('src/contents/metawear_syncing.ipynb', 'utf8').toString()
// result = jupyter().markup({ content: content, filename: 'src/contents/metawear_syncing.ipynb' })
// fs.writeFileSync('test.html', result['code'])
