import { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';

// Definieren des Typs für den Zustand und die Setzer-Funktionen
interface TimeContextType {
    pauseTime: number;
    setPauseTime: (value: number) => void;
    workTime: number;
    channel: string;
    setWorkTime: (value: number) => void;
    setChannel: (value: string) => void;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

const parseNumberCookie = (cookieName: string): number => {
    return Number(localStorage.getItem(cookieName));
};

const TimeProvider: FunctionComponent<{children: ReactNode}> = ({ children }) => {
    const [pauseTime, setPauseTime] = useState<number>(parseNumberCookie('pause') || 600);
    const [workTime, setWorkTime] = useState<number>(parseNumberCookie('work') || 3000);
    const [ channel, setChannel ] = useState(localStorage.getItem('channel') || "");

    return (
        <TimeContext.Provider value={{ pauseTime, setPauseTime, workTime, setWorkTime, channel, setChannel }}>
            {children}
        </TimeContext.Provider>
    );
};

const useTime = () => {
    const context = useContext(TimeContext);
    if (context === undefined) {
        throw new Error('useTime muss innerhalb eines TimeProvider verwendet werden');
    }
    return context;
};

export { TimeProvider, useTime };