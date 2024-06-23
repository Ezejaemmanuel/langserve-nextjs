// 'use client'
// import useBot from '@/ai/hooks/bothook';

// export default function Einstein() {

//     const { answer, input, handleInputChange, handleSubmit, isLoading } = useBot();

//     return (
//         <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
//             <h1 className='font-bold text-4xl'>Einstein</h1>
//             <div className='p-4 border rounded'>
//                 <input className='w-full rounded' value={input} onChange={handleInputChange} id="inputRef" type="text" name="msg" placeholder="Enter your message" />
//             </div>
//             <div className='flex'>
//                 <div className='flex-grow'></div>

//                 {isLoading ? <button disabled={isLoading} type='submit' className="border opacity-40 rounded p-2 text-xs text-white bg-sky-500">
//                     Loading .....
//                 </button> : <button type='submit' className="border rounded p-2 text-xs text-white bg-sky-500">
//                     Send Query
//                 </button>}
//             </div>
//             <div className='flex-grow transition-[flex-grow] ease-in-out'>{answer}</div>
//         </form>
//     )
// }


'use client'
import useBot from '@/ai/hooks/bothook';
import { FaUser, FaRobot } from 'react-icons/fa';

export default function Einstein() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useBot();

    return (
        <div className="flex flex-col mx-auto h-screen bg-neutral-950 text-white max-w-5xl">
            <header className="py-4 bg-neutral-950 text-center">
                <h1 className="text-4xl font-bold">Einstein</h1>
            </header>
            <div className="flex-grow overflow-y-auto p-4">
                <div className="max-w-xl mx-auto flex flex-col ">
                    {messages.map((m) => (
                        <div key={m.id} className="whitespace-pre-wrap flex items-start space-x-4">
                            {m.role === "user" ? <FaUser className="text-blue-400 text-2xl" /> : <FaRobot className="text-green-400 text-4xl" />}
                            <div>
                                <span className="font-bold">{m.role === "user" ? "User: " : "AI: "}</span>
                                <span>{m.content}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-4 flex-none">
                <div className="flex items-center space-x-2 mx-w-3xl">
                    <input
                        className="flex-grow p-2 rounded bg-gray-700 text-white focus:outline-none"
                        value={input}
                        onChange={handleInputChange}
                        id="inputRef"
                        type="text"
                        name="msg"
                        placeholder="Enter your message"
                    />
                    <button
                        type="submit"
                        className={`border rounded p-2 text-xs ${isLoading ? "opacity-40" : "bg-sky-500 text-white"}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Send Query"}
                    </button>
                </div>
            </form>
        </div>
    );
}
