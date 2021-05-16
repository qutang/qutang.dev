import customMarked from "./md-it";
import fs from 'fs';

function saveBase64Image(base64Str, name, post_name) {
  var data = base64Str;
  if (!fs.existsSync("static/jupyter-assets/")) {
    fs.mkdirSync("static/jupyter-assets/");
  }
  var path = "static/jupyter-assets/" + post_name + "_" + name + ".png";
  var ref = "/jupyter-assets/" + post_name + "_" + name + ".png";
  fs.writeFile(path, data, { encoding: "base64" }, function (err) {
    //Finished
    // console.log(err);
  });
  return ref;
}

function jupyterDom2Markdown(dom, slug) {
  let img_index = 0;
  let result = [];
  dom["cells"].forEach((element) => {
    if (element["cell_type"] == "markdown") {
      if (element["source"].length > 0) {
        if (typeof element["source"] == 'string') {
          if (!element["source"].endsWith("\n")) {
            element["source"] += "\n";
          }
        } else {
          if (!element["source"][element['source'].length - 1].endsWith("\n")) {
            element["source"][element['source'].length - 1] += "\n";
          }
        }
        result = result.concat(element["source"]);
      }
    } else if (element["cell_type"] == "code") {
      if (element["source"].length > 0) {
        if (typeof element["source"] == 'string') {
          if (!element["source"].endsWith("\n")) {
            element["source"] += "\n";
          }
        } else {
          if (!element["source"][element['source'].length - 1].endsWith("\n")) {
            element["source"][element['source'].length - 1] += "\n";
          }
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
                var name = output["data"]["text/plain"];
                var base64Str = output["data"][key];
                var ref = saveBase64Image(base64Str, img_index++, slug);
                result += "![" + name + "](" + ref + ")\n\n";
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
            var name = output["data"]["text/plain"];
            var base64Str = output["data"]["image/png"];
            var ref = saveBase64Image(base64Str, img_index++, slug);
            return "![" + name + "](" + ref + ")\n\n";
          }
        });
        result = result.concat(outputs);
      }
    }
  });
  result = result.join("");
  return result;
}

function jupyterRenderer(content, slug) {
  let result;
  let jupyterDom;
  if (typeof content == 'string') {
    jupyterDom = JSON.parse(content);
  } else {
    jupyterDom = content;
  }
  
  content = jupyterDom2Markdown(jupyterDom, slug);
  result = customMarked(content);
  return result;
}

export default jupyterRenderer;
