import { get_projects } from "../_projects.js";

export async function get(req, res) {
  // the `page` parameter is available because
  // this file is called [page].json.js
  const { page } = req.params;

  const result = await get_projects();
  const page_projects = await result.projects.filter((proj) => proj.page === page);
  const totalPages = result.totalPages;

  if (page_projects.length > 0) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(
      await JSON.stringify({ projects: page_projects, totalPages: totalPages })
    );
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
