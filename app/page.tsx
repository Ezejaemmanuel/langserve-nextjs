"use client";
import Einstein from "@/components/einstein";

export default function Home() {
  return (
    <main className="flex flex-col h-full space-y-4 bg-black">
      <div className="">
        <Einstein />
      </div>
    </main>
  );
}



// "use client";

// import { useChat } from "ai/react";

// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat({
//     api: "/api/ai",
//   }); 
//   console.log("this is hte messages",messages)
//   return (
//     <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
//       {messages.map((m) => (
//         <div key={m.id} className="whitespace-pre-wrap">
//           {m.role === "user" ? "User: " : "AI: "}
//           {m.content}
//         </div>
//       ))}

//       <form onSubmit={handleSubmit}>
//         <input
//           className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }