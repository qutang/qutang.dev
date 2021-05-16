import { get_projects } from "$lib/Project/_projects";

export async function get({ params }) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { repo } = params;
  const result = await get_projects(repo);
  const projects = result.projects;
  // filter
  const repo_proj = await projects.filter((proj) => proj.repo == repo);

  if (repo_proj.length > 0) {
    return {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: repo_proj[0]
    }
  }
}
