const token = process.env.YUQUE_TOKEN;

async function main() {
  const SDK = require("@yuque/sdk");
  let client = new SDK({
    token: token,
    // other options
  });
  let result = await client.docs.get({
    namespace: "qutang/blog-programming",
    slug: "ku9cz3",
    data: {
      raw: 1,
    },
  });
  console.log(result);
}

main();
