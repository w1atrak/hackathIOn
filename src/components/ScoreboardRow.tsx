interface ScoreboardRowProps {
    id: number;
    username: string;
    classname: string;
    score: string;
}

export const ScoreboardRow = (props: ScoreboardRowProps & { isCurrentUser?: boolean }) => {
    return (
        <div className={`grid grid-cols-4 items-center py-2 px-4 rounded-lg ${props.isCurrentUser ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}>
            <span className="col-span-3">{props.id + 1}. <b>{props.username}</b> • {props.classname}</span>
            <span className="col-span-1 text-right">{props.score} zł/h</span>
        </div>
    );
};
