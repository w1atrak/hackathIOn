interface ScoreboardRowProps {
    id: number,
    username: string,
    classname: string,
    score: string
}


export const ScoreboardRow = (props: ScoreboardRowProps & { isCurrentUser?: boolean }) => {
    return (
        <div className={`flex items-center justify-between py-2 px-4 rounded-lg ${props.isCurrentUser ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}>
            <span>{props.id + 1}. {props.username}</span>
            <span>|</span>
            <span>{props.classname}</span>
            <span>|</span>
            <span>{props.score} zł/h</span>
        </div>
    );
}