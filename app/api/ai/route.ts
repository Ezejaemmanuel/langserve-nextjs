


import { RemoteRunnable } from "langchain/runnables/remote";

interface Configurable {
  condition: string;
  question_id: string;
  user_id: string;
}

interface Config {
  configurable: Configurable;
}

interface RequestBody {
  input: string;
  config: Config;
}

async function* makeIterator(input: string, config: Config) {
  console.log("makeIterator called with input:", input, "and config:", config);  // makeIterator called

  const langserveUrl = "http://127.0.0.1:9090/ai/ask-question";
  // const langserveUrl = "http://localhost:9090"
  console.log("langserveUrl:", langserveUrl);  // langserveUrl

  const chain = new RemoteRunnable({
    url: langserveUrl,
  });
  console.log("RemoteRunnable created with url:", langserveUrl);  // RemoteRunnable created

  // const stream = await chain.stream({
  //   input: input,
  //   configurable: config.configurable,
  // });
  console.log("this is hte innput", input);
  console.log("this is the confiig", config)
  const stream = await chain.stream(
    input,
    {
      configurable: {
        condition: config.configurable.condition,
        question_id: config.configurable.question_id,
        user_id: config.configurable.user_id // Correct this mapping
      }
    },

  );

  for await (const chunk of stream) {
    console.log("Chunk received from stream:", chunk);  // Chunk received

    const answerChunk = chunk as any;
    if (answerChunk.content) {
      console.log("answerChunk.content:", answerChunk.content);  // answerChunk content
      yield answerChunk.content;
    }
  }
}

function iteratorToStream(iterator: AsyncGenerator<string, void, unknown>) {
  console.log("iteratorToStream called with iterator:", iterator);  // iteratorToStream called

  return new ReadableStream({
    async pull(controller) {
      console.log("ReadableStream pull called");  // ReadableStream pull called

      const { value, done } = await iterator.next();
      console.log("Iterator next value:", value, "done:", done);  // Iterator next result

      if (done) {
        controller.close();
        console.log("Controller closed because iterator is done");  // Controller closed
      } else {
        controller.enqueue(value);
        console.log("Controller enqueued value:", value);  // Controller enqueued value
      }
    },
  });
}

export async function POST(request: Request) {
  console.log("POST function called with request:", request);  // POST function called

  const json: RequestBody = await request.json();
  console.log("Request JSON parsed oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo:", json);  // Request JSON parsed

  const { input, config } = json;
  console.log("Query and config extracted:", input, config);  // Query and config extracted

  const iterator = makeIterator(input, config);
  console.log("Iterator created from makeIterator");  // Iterator created

  const stream = iteratorToStream(iterator);
  console.log("Stream created from iteratorToStream");  // Stream created

  return new Response(stream);
}



// import {
//   AIStream,
//   AIStreamCallbacksAndOptions,
//   AIStreamParser,
//   StreamingTextResponse,
//   createStreamDataTransformer,
// } from "ai";

// export const dynamic = "force-dynamic";

// function parseLangServeStream(): AIStreamParser {
//   return (data) => {
//     const json = JSON.parse(data) as { content: string };
//     return json.content;
//   };
// }

// export function LangServeStream(
//   res: Response,
//   cb?: AIStreamCallbacksAndOptions,
// ): ReadableStream {
//   return AIStream(res, parseLangServeStream(), cb).pipeThrough(
//     createStreamDataTransformer(),
//   );
// }

// export async function POST(req: Request) {
//   const { messages } = await req.json();
//   const lastMessage = messages[messages.length - 1];
//   // const postData = { input: lastMessage.content };

//   const postData = {
//     "input": {
//       "input": "what is physics"
//     },
//     "config": {
//       "configurable": {
//         "condition": "is_question",
//         "question_id": "t",
//         "user_id": "t"
//       }
//     },
//     "kwargs": {}
//   };

//   const fetchResponse = await fetch("http://localhost:9090/invoke", {
//     method: "POST",
//     headers: {
//       "accept": "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(postData),
//   });


//   const anthropicStream = LangServeStream(fetchResponse, {
//     onStart: async () => {
//       console.log("Stream started");
//     },
//     onCompletion: async (completion) => {
//       console.log("Completion completed", completion);
//     },
//     onFinal: async (completion) => {
//       console.log("Stream completed", completion);
//     },
//     onToken: async (token) => {
//       console.log("Token received", token);
//     },
//   });
//   console.log("this is hte anthropic stream", anthropicStream)
//   return new StreamingTextResponse(anthropicStream);
// }