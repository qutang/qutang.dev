import { get_projects } from "$lib/Project/_projects";

export async function get({ params }) {
  // the `page` parameter is available because
  // this file is called [page].json.js
  const { page } = params;

  const result = await get_projects();
  const page_projects = await result.projects.filter((proj) => proj.page === page);
  const totalPages = result.totalPages;

  if (page_projects.length > 0) {
    return {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        projects: page_projects,
        totalPages: totalPages
      }
    }
  }
}
