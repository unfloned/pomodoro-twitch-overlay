import {Fragment, useEffect, useState} from "react";
import {useTime} from "../provider/pomodoro.tsx";

function formatSecondsAsTime(seconds: number) {
    const mins: number = Math.floor(seconds / 60);
    const secs: number = seconds % 60;

    const formattedMins = mins.toString().padStart(2, '0');
    const formattedSecs = secs.toString().padStart(2, '0');

    return [formattedMins, formattedSecs];
}


export const Pomodoro = () => {
    const { workTime, pauseTime } = useTime();
    const [ countDown, setCountDown ] = useState(0);
    const [ streaks, setStreaks ] = useState(0);
    const [ isPause, setIsPause ] = useState(true);
    const [ firstRun, setFirstRun ] = useState(true);

    useEffect(() => {
        const timerId = setInterval(() => {
            if ( countDown <= 0 ) {
                if ( isPause && !firstRun ) setStreaks((streaks + 1));
                if ( firstRun ) setFirstRun(false);

                setIsPause(!isPause);
                setCountDown(isPause ? pauseTime : workTime);

                return;
            }


            setCountDown(countDown - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [countDown]);

    return (<Fragment>
            {!isPause && <div className="pause-container">BREAK</div>}
            <div className="pomodoro-container" key={"pomodoro"}>
                <div className="minutes">{formatSecondsAsTime(countDown)[0]}</div>
                <div className="seconds">{formatSecondsAsTime(countDown)[1]}</div>
                <div className="streaks">Streaks: {streaks}</div>
            </div>
        </Fragment>
    );
}