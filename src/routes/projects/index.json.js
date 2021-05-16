import { get_projects } from "$lib/Project/_projects";

export async function get({ params }) {

  const result = await get_projects();
  // console.log(result);
  if (result != null) {
    if (result.projects.length > 0) {
      return {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: result
      }
    }
  }
}

