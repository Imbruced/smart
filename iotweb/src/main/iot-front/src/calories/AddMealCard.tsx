import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Measurement from "./AddMeal";
import {Grid} from "@material-ui/core";
import CaloriesTable from "./table/CaloriesTable";
import {Row} from "./table/types";

export default function AddMealCard() {
    const [table, setTable] = useState<Array<Row>>([])

    const addRow = (newRow: Row) => {
        setTable([...table, newRow])
    }

    const removeRow = (selected: Array<number>) => {
        setTable(table.filter(it => !selected.includes(it.rowNumber)))
    }

    const saveMeal = () => {
        fetch("/meal", {
            body: JSON.stringify({
                products: table.map(
                    it => {
                        return {
                            fat: it.fat,
                            carbo: it.carbo,
                            protein: it.protein,
                            name: it.name,
                            calories: it.calories,
                        }
                    }
                )
            }),
            method: "POST",
            headers: {"content-type": "application/json"}
        }).then(r => console.log(r.json()))
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <Measurement addRow={addRow}/>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid xs={12}><br/></Grid>
            <Grid container spacing={0}>
                <Grid xs={3}>
                </Grid>
                <Grid xs={6}>
                    {
                        table.length > 0 ? <CaloriesTable table={table} removeRow={removeRow}/> : <div></div>
                    }

                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid xs={7} ></Grid>
                <Grid xs={3} > <Button  onClick={saveMeal} color="primary"> ADD </Button></Grid>
            </Grid>

        </Grid>

    );
}