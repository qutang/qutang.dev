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
        result.push("```python\n");
        result = result.concat(element["source"]);
        result.push("```\n");
        result.push("\n");
      }
      if (element["outputs"].length > 0) {
        let outputs = element["outputs"].map((output) => {
          if (output["output_type"] == "execute_result") {
            let key = Object.keys(output["data"])[0];
            if (key == "text/html") {
              return output["data"][key].join("") + "\n\n";
            } else {
              return output["data"][key].join("") + "\n";
            }
          } else if (output["output_type"] == "stream") {
            var text = output["text"];
            return "```output\n" + text.join("") + "```\n\n";
          } else if (output["output_type"] == "display_data") {
            return (
              "![" +
              output["data"]["text/plain"] +
              "](data:image/png;base64," +
              output["data"]["image/png"] +
              ")\n"
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
