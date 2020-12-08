import { get_projects } from "./_projects.js";

export async function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { repo } = req.params;
  const result = await get_projects(repo);
  const projects = result.projects;
  // filter
  const repo_proj = await projects.filter((proj) => proj.repo == repo);

  if (repo_proj.length > 0) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(repo_proj[0]));
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
}
