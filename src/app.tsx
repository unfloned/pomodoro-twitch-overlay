import {Fragment, useEffect, useState} from "react";
import ComfyJS from "comfy.js";
import {Pomodoro} from "./components/pomodoro.tsx";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Settings} from "./components/settings.tsx";
import {useTime} from "./provider/pomodoro.tsx";
import {Task, Tasks} from "./interfaces.ts";

const twitchChannel = "unfloned";

export const App = () => {
    const { channel } = useTime();
    const [ tasks, setTasks] = useState<Tasks[]>([]);

    ComfyJS.onCommand = ( user, command, message, flags ) => {
        if( flags.broadcaster && command === "tclear" ) {
            console.log(message);
            setTasks([]);
            ComfyJS.Say("Tasks clears", twitchChannel);
        }

        if( flags.broadcaster && command === "tremove" ) {
            const userTasks = tasks.findIndex((task) => task.user === message);
            if ( userTasks == -1) return;
            tasks.splice(userTasks, 1);
            setTasks([...tasks]);
            //ComfyJS.Say("Tasks clears", twitchChannel);
        }

        if ( command === "task" || command === "t") {
            const userTasks = tasks.find((task) => task.user === user);
            if ( !userTasks ) {
                tasks.push({
                    user: user,
                    tasks: [new Task(message)]
                });
            } else {
                const exists = userTasks.tasks.find((task) => task.message === message);
                if ( !exists ) userTasks.tasks.push(new Task(message));
            }

            setTasks([...tasks]);
            console.log('created task');
        }

        if ( command === "done" || command === "d") {
            const index = Number(message.trim());

            const userTasks = tasks.find((task) => task.user === user);
            if ( !userTasks ) return;
            if ( !userTasks.tasks[index] ) return;

            userTasks.tasks[index]!.done = !userTasks.tasks[index]!.done;
            setTasks([...tasks]);
        }

        if ( command === "rename" || command === "r" ) {
            const [ index, msg] = message.split(";");

            const userTasks = tasks.find((task) => task.user === user);
            if ( !userTasks ) return;
            if ( !userTasks.tasks[Number(index)] ) return;

            userTasks.tasks[Number(index)]!.message = msg;
            setTasks([...tasks]);

        }
    }

    useEffect(() => {
        if ( channel.length === 0 || !channel ) return;

        ComfyJS.Init(channel);

        return () => ComfyJS.Disconnect();
    }, [channel]);

    return (
        <Fragment>
            <Settings />
            <Pomodoro />
            <div className="tasks-container">
                <Splide style={{height: '100%'}} options={
                    {
                        type: 'loop',
                        direction: 'ttb',
                        autoplay: true,
                        interval: 5000,
                        pauseOnHover: false,
                        pauseOnFocus: false,
                        pagination: false,
                        useScroll: false,
                        arrows: false,
                        height: "100%",
                        heightRatio: 1,
                        autoHeight: true
                    }
                }>
                    {tasks.map((value) =>
                        <SplideSlide key={"user_tasks_" + value.user}>
                            <div className={"user-tasks"}>
                                <div className="header">{value.user}</div>
                                <div className="body">
                                    {value.tasks.map((task, index) =>
                                        <div key={value.user + "_task_" + index} style={{textDecoration: task.done ? 'line-through' : 'none'}}>{index}: {task.message}</div>
                                    )}
                                </div>
                            </div>
                        </SplideSlide>)}
                </Splide>
            </div>
        </Fragment>
    );
}