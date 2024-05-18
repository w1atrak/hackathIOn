import Chatbox from "~/app/Chatbox";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';


export default function Introduction() {
    const [isChatboxComplete, setIsChatboxComplete] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (isChatboxComplete) {
            navigate('/login');
        }
    }, [isChatboxComplete]);

    const chatLines = ["Witamy na Wydziale Informatyki!\n" +
    "Niezależnie od Twoich aspiracji, to miejsce jest dla Ciebie! Tu, na Wydziale Informatyki, możesz stać się kimkolwiek zechcesz", "Czeka Cię mnóstwo wyzwań, w których pomoże wiedza zdobyta podczas warsztatów. Wybierz swoją klasę i zacznij zarabiać. Pamiętaj, że wielka moc oraz umiejętności niosą ze sobą wielką... stawkę godzinową!\n"];

    return (
        <div className="relative flex items-center justify-center h-screen flex-col">
            <h1 className="text-4xl text-white mb-10">Insert tytuł here</h1>
            <img className="w-1/2 mb-0" src="/xdddddd.png" alt="powazny czlowiek"/>
            <Chatbox chatLines={chatLines} setIsChatboxComplete = {setIsChatboxComplete}></Chatbox>
        </div>
    );
}