import {Chip, Typography} from "@mui/material";
import {UserClass} from "~/components/Scoreboard";

interface ScoreboardRowProps {
    id: number,
    username: string,
    userClass: UserClass,
    score: string
}


export const ScoreboardRow = (props: ScoreboardRowProps) => {
    return <div style={{
        display: "flex",
        gap: "8px",
        justifyItems: "center",
        border: '1px solid black',
        padding: '24px 16px',
        borderRadius: '24px',
        backgroundColor: '#38598b'
    }}>
        <Typography sx={{fontSize: 14}} gutterBottom>
            {props.id + 1}
        </Typography>
        <Typography variant="h5" component="div">
            {props.username}
        </Typography>
        <Typography>
            <Chip style={{color: 'white'}} label={props.userClass} size='small' variant="outlined" />
        </Typography>
        <Typography style={{marginLeft: '8px'}} variant="body2">
            {props.score}
        </Typography>
    </div>
}