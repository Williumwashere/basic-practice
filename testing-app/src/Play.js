export default {
  async fetch(request, env) {
    return await handleRequest(request, env).catch(
      (err) => new Response(err.stack, { status: 500 })
    );
  },
};

/**
 * Many more examples available at:
 *   https://developers.cloudflare.com/workers/examples
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request, env) {
  const method = request.method;

  if (method === "GET") {
    try {
      const commentsList = (await env.GoOut.get("comments")) || "[]";
      const response = new Response(commentsList, { status: 200 });
      return response;
    } catch (e) {
      console.log(e);
      const response = new Response("Unable to retrieve data.", {
        status: 400,
      });
      return response;
    }
  }

  if (method === "POST") {
    try {
      const testData = await request.json();
      const commentsList = (await env.GoOut.get("comments")) || "[]";
      const commentsParsed = JSON.parse(commentsList);
      const updateArray = [testData, ...commentsParsed];
      const properArray = JSON.stringify(updateArray);
      await env.GoOut.put("comments", properArray);
      const response = new Response(updateArray, { status: 200 });
      return response;
    } catch {
      const responseError = new Response("Did not update", { status: 400 });
      return responseError;
    }
  }
  return fetch("https://welcome.developers.workers.dev");
}
