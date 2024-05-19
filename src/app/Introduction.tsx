import Chatbox from "~/app/Chatbox";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {useRouter} from "next/navigation";


export default function Introduction() {
    const [isChatboxComplete, setIsChatboxComplete] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (isChatboxComplete) {
            router.push("/login")
        }
    }, [isChatboxComplete]);

    const chatLines = ["Witamy na Wydziale Informatyki!\n" +
    "Niezależnie od Twoich aspiracji, to miejsce jest dla Ciebie! Tu, na WI, możesz stać się kimkolwiek zechcesz.", "Czeka Cię mnóstwo wyzwań, w których pomoże wiedza zdobyta podczas warsztatów. Wybierz swoją klasę i zacznij zarabiać. Pamiętaj, że wielka moc oraz umiejętności niosą ze sobą wielką... stawkę godzinową!\n"];

    return (
            <Chatbox chatLines={chatLines} showTitle={true} setIsChatboxComplete = {setIsChatboxComplete}></Chatbox>
    );
}