import React, { useRef, useState } from 'react'

const SimpleTryTimer = () => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const timerRef = useRef<any>(null);

    const startTimer = ()=>{
        if (!isRunning) {
            setIsRunning(true);
            const startTime = Date.now() - time;
            timerRef.current = setInterval(()=>{
                setTime(Date.now() - startTime);
            },1000);
        }
    }
    const stopTimer = ()=>{
        if (isRunning && timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setIsRunning(false);
        }
    }
    const resetTimer = ()=>{
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setTime(0);
        setIsRunning(false);

    }
    return (
        <div>
            <h1>{Math.floor(time/1000)}</h1>
        {/* <h1>{Math.floor(time / 100    0)}s</h1> */}
        <button onClick={startTimer} disabled={isRunning}>
            Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
            Stop
        </button>
        <button onClick={resetTimer}>
            Reset
        </button>
        </div>
    )
}

export default SimpleTryTimer