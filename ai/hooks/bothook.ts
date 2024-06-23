




// import { FormEvent, useState } from 'react';

// type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

// type HandleSubmitFunction = (e: FormEvent<HTMLFormElement>) => void;

// interface UseBotReturn {
//   answer: string;
//   input: string;
//   inputSize: number;
//   handleInputChange: (event: InputChangeEvent) => void;
//   handleSubmit: HandleSubmitFunction;
//   setInput: (input: string) => void;
//   resetQuery: () => void;
//   done: boolean;
//   isLoading: boolean;
// }

// const useBot = (): UseBotReturn => {
//   console.log("Initializing useBot");  // Initialization of useBot

//   const [input, setInput] = useState<string>('');
//   console.log("Initial input state:", input);  // Initial state of input

//   const [answer, setAnswer] = useState<string>('');
//   console.log("Initial answer state:", answer);  // Initial state of answer

//   const [inputSize, setInputSize] = useState<number>(0);
//   console.log("Initial inputSize state:", inputSize);  // Initial state of inputSize

//   const [done, setDone] = useState<boolean>(false);
//   console.log("Initial done state:", done);  // Initial state of done

//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   console.log("Initial isLoading state:", isLoading);  // Initial state of isLoading

//   const handleInputChange = (event: InputChangeEvent): void => {
//     console.log("handleInputChange called with event:", event);  // handleInputChange called
//     setInput(event.target.value);
//     console.log("Updated input state:", event.target.value);  // Updated input state

//     setInputSize(event.target.value.length);
//     console.log("Updated inputSize state:", event.target.value.length);  // Updated inputSize state
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     console.log("handleSubmit called with event:", e);  // handleSubmit called
//     e.preventDefault();

//     if (!input) {
//       console.log("No input provided, returning early");  // No input provided
//       return;
//     }

//     setAnswer("");
//     console.log("Answer reset to empty string");  // Answer reset
//     setIsLoading(true);
//     console.log("Set isLoading state to true");  // Set isLoading to true

//     try {
//       const response = await fetch('/api/ai', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           input: {
//             input: input
//           },
//           config: {
//             configurable: {
//               condition: "is_questi",  // Add your condition value here
//               question_id: "this_is_the_qu",  // Add your question_id value here
//               user_id: "this_is_the_us"  // Add your user_id value here
//             }
//           },
//           kwargs: {}
//         })
//       });

//       console.log("Response received from fetch:", response);  // Response received

//       if (!response.body) {
//         console.log("Response body is null, returning early");  // Response body is null
//         setIsLoading(false);
//         console.log("Set isLoading state to false");  // Set isLoading to false
//         return;
//       }

//       const reader = response.body.getReader();
//       console.log("Reader created from response body");  // Reader created

//       setDone(false);
//       console.log("Set done state to false");  // Set done to false

//       return new ReadableStream({
//         start(controller) {
//           console.log("ReadableStream started");  // ReadableStream started

//           function push() {
//             reader.read().then(({ done, value }) => {
//               console.log("Reader read done:", done, "value:", value);  // Reader read result

//               if (done) {
//                 setDone(true);
//                 console.log("Set done state to true");  // Set done to true
//                 setIsLoading(false);
//                 console.log("Set isLoading state to false");  // Set isLoading to false
//                 controller.close();
//                 console.log("Controller closed");  // Controller closed
//                 return;
//               }

//               let decoder = new TextDecoder();
//               let text = decoder.decode(value);
//               console.log("Decoded text:", text);  // Decoded text

//               setAnswer(answer => answer + text);
//               console.log("Updated answer state:", answer);  // Updated answer

//               controller.enqueue(value);
//               console.log("Controller enqueued value");  // Controller enqueued value
//               push();
//             });
//           }

//           push();
//         },
//       });

//     } catch (error) {
//       console.log("Caught error:", error);  // Catch error
//       setIsLoading(false);
//       console.log("Set isLoading state to false");  // Set isLoading to false
//     }
//   }

//   function resetQuery() {
//     console.log("resetQuery called");  // resetQuery called
//     setInput('');
//     console.log("Input reset to empty string");  // Input reset
//   }

//   return { answer, input, inputSize, setInput, handleInputChange, handleSubmit, resetQuery, done, isLoading };
// };

// export default useBot;



// import { FormEvent, useState } from 'react';

// type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

// type HandleSubmitFunction = (e: FormEvent<HTMLFormElement>) => void;

// interface Message {
//   id: number;
//   role: 'user' | 'ai';
//   content: string;
// }

// interface UseBotReturn {
//   messages: Message[];
//   input: string;
//   inputSize: number;
//   handleInputChange: (event: InputChangeEvent) => void;
//   handleSubmit: HandleSubmitFunction;
//   setInput: (input: string) => void;
//   resetQuery: () => void;
//   done: boolean;
//   isLoading: boolean;
// }

// const useBot = (): UseBotReturn => {
//   console.log("Initializing useBot");

//   const [input, setInput] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputSize, setInputSize] = useState<number>(0);
//   const [done, setDone] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleInputChange = (event: InputChangeEvent): void => {
//     setInput(event.target.value);
//     setInputSize(event.target.value.length);
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!input) {
//       return;
//     }

//     const userMessage: Message = { id: Date.now(), role: 'user', content: input };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/ai', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           input: { input: input },
//           config: {
//             configurable: {
//               condition: "is_questi",
//               question_id: "this_is_the_qu",
//               user_id: "this_is_the_us"
//             }
//           },
//           kwargs: {}
//         })
//       });

//       if (!response.body) {
//         setIsLoading(false);
//         return;
//       }

//       const reader = response.body.getReader();
//       setDone(false);

//       return new ReadableStream({
//         start(controller) {
//           function push() {
//             reader.read().then(({ done, value }) => {
//               if (done) {
//                 setDone(true);
//                 setIsLoading(false);
//                 controller.close();
//                 return;
//               }

//               const decoder = new TextDecoder();
//               const text = decoder.decode(value);
//               setMessages((prevMessages) => {
//                 const lastMessage = prevMessages[prevMessages.length - 1];
//                 if (lastMessage && lastMessage.role === 'ai') {
//                   lastMessage.content += text;
//                   return [...prevMessages];
//                 } else {
//                   return [...prevMessages, { id: Date.now(), role: 'ai', content: text }];
//                 }
//               });

//               controller.enqueue(value);
//               push();
//             });
//           }

//           push();
//         },
//       });

//     } catch (error) {
//       setIsLoading(false);
//     }
//   }

//   function resetQuery() {
//     setInput('');
//   }

//   return { messages, input, inputSize, setInput, handleInputChange, handleSubmit, resetQuery, done, isLoading };
// };

// export default useBot;



import { FormEvent, useState } from 'react';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

type HandleSubmitFunction = (e: FormEvent<HTMLFormElement>) => void;

interface Message {
  id: number;
  role: 'user' | 'ai';
  content: string;
}

interface UseBotReturn {
  messages: Message[];
  input: string;
  inputSize: number;
  handleInputChange: (event: InputChangeEvent) => void;
  handleSubmit: HandleSubmitFunction;
  setInput: (input: string) => void;
  resetQuery: () => void;
  done: boolean;
  isLoading: boolean;
}

const useBot = (): UseBotReturn => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputSize, setInputSize] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (event: InputChangeEvent): void => {
    setInput(event.target.value);
    setInputSize(event.target.value.length);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) {
      return;
    }

    const userMessage: Message = { id: Date.now(), role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { input: input },
          config: {
            configurable: {
              condition: "is_questi",
              question_id: "this_is_the_qu",
              user_id: "this_is_the_us"
            }
          },
          kwargs: {}
        })
      });

      if (!response.body) {
        setIsLoading(false);
        return;
      }

      const reader = response.body.getReader();
      setDone(false);

      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                setDone(true);
                setIsLoading(false);
                controller.close();
                return;
              }

              const decoder = new TextDecoder();
              const text = decoder.decode(value);

              setMessages((prevMessages) => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                if (lastMessage && lastMessage.role === 'ai') {
                  // Create a new array to avoid direct mutation of state
                  const updatedMessages = [...prevMessages];
                  updatedMessages[updatedMessages.length - 1] = {
                    ...lastMessage,
                    content: lastMessage.content + text,
                  };
                  return updatedMessages;
                } else {
                  return [...prevMessages, { id: Date.now(), role: 'ai', content: text }];
                }
              });

              controller.enqueue(value);
              push();
            });
          }

          push();
        },
      });

    } catch (error) {
      setIsLoading(false);
      console.error('Error while fetching AI response:', error);
    }
  }

  function resetQuery() {
    setInput('');
  }

  return { messages, input, inputSize, setInput, handleInputChange, handleSubmit, resetQuery, done, isLoading };
};

export default useBot;
