"use client";
import { AiChat } from '@nlux/react';
import { useChatAdapter } from '@nlux/langchain-react';
import '@nlux/themes/nova.css';

export default () => {
    // LangServe adapter that connects to a demo LangChain Runnable API
    const adapter = useChatAdapter({
        url: 'http://localhost:9090/ai/ask-question', config: {
            configurable: {
                condition: "is_question",
                question_id: "this_is_it",
                user_id: "this_isi_it" // Correct this mapping
            }
        },
        dataTransferMode: "stream"



    });
    console.log("this is the adapter ooo", adapter)

    return (
        <AiChat

            adapter={adapter}
            personaOptions={{
                assistant: {
                    name: 'Feather-AI',
                    avatar: 'https://docs.nlkit.com/nlux/images/personas/feather.png',
                    tagline: 'Yer AI First Mate!'
                },
                user: {
                    name: 'Alex',
                    avatar: 'https://docs.nlkit.com/nlux/images/personas/alex.png'
                }
            }}
            layoutOptions={{
                height: 320,
                maxWidth: 600
            }}
        />
    );
};