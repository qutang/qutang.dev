import { get_projects } from "./_projects.js";

export async function get(req, res) {

  const result = await get_projects();
  const contents = await JSON.stringify(result);
  // console.log(result);
  if (result != null) {
    if (result.projects.length > 0) {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
  
      res.end(contents);
    } else {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
  
      res.end(
        JSON.stringify({
          message: `Not found`,
        })
      );
    }
  } else {
    next();
  }
  
}

