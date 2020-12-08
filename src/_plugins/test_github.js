const { Octokit } = require("@octokit/rest");

const token = process.env.GITHUB_QUTANG_DEV_TOKEN;

console.log(token);

async function main() {
    let client = new Octokit({
        auth: token,
        userAgent: "qutang.dev github",
        timeZone: "US/New York"
    });

    let result = await client.repos.getReadme({
        owner: 'qutang',
        repo: 'MUSS',
        mediaType: {
            format: 'html'
        }
    })

    console.log(result);
}

main();

// async function main() {
//   const SDK = require("@yuque/sdk");
//   let client = new SDK({
//     token: token,
//     // other options
//   });
//   let result = await client.docs.get({
//     namespace: "qutang/blog-programming",
//     slug: "ku9cz3",
//     data: {
//       raw: 1,
//     },
//   });
//   console.log(result);
// }

// main();
