import Chatbox from "~/app/Chatbox";

export default function Introduction() {
    const chatLines = ["Hello", "How are you?", "This is a test", "Goodbye"];
    return (
        <div className="relative flex items-center justify-center h-screen flex-col">
            <h1 className="text-4xl text-white mb-10">Insert tytuł here</h1>
            <img className="w-1/2 mb-0" src="/xdddddd.png" alt="powazny czlowiek"/>
            <Chatbox chatLines={chatLines}></Chatbox>
        </div>
    );
}