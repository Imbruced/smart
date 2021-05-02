import React, {useEffect, useState} from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import {Grid} from "@material-ui/core";

interface CaloriesTotal{calories: number}

const dateFormat = require('dateformat');

export const DailySummary = () => {
    const [calories, setCalories] = useState<CaloriesTotal>({calories: 0})
    const getTodayCalories = (date: string) => {
        fetch(`/meals?date=${date}`, {method: "GET"})
            .then(r => r.json())
            .then(r => setCalories({calories: r.calories}))
    }

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2021-04-17T21:11:54'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        getTodayCalories(dateFormat(date, "yyyy-mm-dd"))
    };

    useEffect(() => {
        getTodayCalories(dateFormat(selectedDate, "yyyy-mm-dd"))
    }, []); // effect will be fired when signed changes

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            Today Calories: {calories.calories}
        </div>
    )
}