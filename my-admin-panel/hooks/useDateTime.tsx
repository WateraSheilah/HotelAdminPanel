// useDateTime.ts
import { useState, useEffect } from 'react';

const useDateTime = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentDay, setCurrentDay] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const timeOptions: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };
            const dateOptions: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
            };
            const dayOptions: Intl.DateTimeFormatOptions = {
                weekday: 'long',
            };

            setCurrentTime(now.toLocaleTimeString([], timeOptions));
            setCurrentDate(now.toLocaleDateString('en-US', dateOptions));
            setCurrentDay(now.toLocaleDateString('en-US', dayOptions));
        };

        // Initial call to set the time and date
        updateDateTime();

        // Update the time and date every minute
        const interval = setInterval(updateDateTime, 60000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return { currentTime, currentDate, currentDay };
};

export default useDateTime;
