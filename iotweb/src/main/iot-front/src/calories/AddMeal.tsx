import React, {ChangeEvent} from "react";
import {Button, Grid, IconButton, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Row} from "./table/types";
import Add from '@material-ui/icons/Add';

interface NutritionMeasure {
    value: number,
    unit: string
}

interface Nutrition {
    name: string,
    protein: NutritionMeasure,
    fat: NutritionMeasure,
    carbo: NutritionMeasure
}

interface Measure {
    rowNumber: number,
    value: number,
    unit: string,
    selected: string,
    protein: number,
    fat: number,
    carbo: number,
    options: Array<Nutrition>
}

interface MeasureMentProps {
    addRow: (row: Row) => void
}

class Measurement extends React.Component<MeasureMentProps, Measure> {

    state = {
        rowNumber: 0,
        unit: 'g',
        value: 0,
        selected: '',
        protein: 0.0,
        fat: 0.0,
        carbo: 0.0,
        options: [] as Array<Nutrition>
    }

    handleChange = (prop: any) => (event: any) => {
        this.setState({...this.state, [prop]: event.target.value});
    };

    constructor(props: MeasureMentProps) {
        super(props)
        this.loadData = this.loadData.bind(this)
    }

    componentDidMount() {
        this.loadData()
        this.currentProduct()
        setInterval(this.loadData.bind(this), 1000);
        setInterval(this.currentProduct.bind(this), 2000);
    }

    async currentProduct() {
        fetch(`/products-voice`, {})
            .then(r => r.json())
            .then(r => {
                console.log(r)
                this.setState({
                        options: r as Array<Nutrition>
                    }
                )
            })
    }

    async loadData() {

        fetch('/scale')
            .then(r => r.json())
            .then(r => {
                    const selectedNutrition = this.state.options.filter(it => it.name === this.state.selected)[0]
                    if (this.state.selected === '') {
                        this.setState({
                                unit: r.measurement.unit,
                                value: r.measurement.value
                            }
                        )
                    } else if (selectedNutrition !== undefined) {
                        this.setState({
                                unit: r.measurement.unit,
                                value: r.measurement.value,
                                fat: parseFloat((selectedNutrition.fat.value * this.state.value / 100).toFixed(2)),
                                carbo: parseFloat((selectedNutrition.carbo.value * this.state.value / 100).toFixed(2)),
                                protein: parseFloat((selectedNutrition.protein.value * this.state.value / 100).toFixed(2))
                            }
                        )
                    }

                }
            )
    }

    saveProduct = (event: any) => {
        this.setState(
            {rowNumber: this.state.rowNumber + 1}
        )
        console.log(this.state.rowNumber)
        this.props.addRow(
            {
                rowNumber: this.state.rowNumber,
                name: this.state.selected,
                fat: this.state.fat,
                carbo: this.state.carbo,
                protein: this.state.protein,
                calories: parseFloat((this.state.carbo * 4 + this.state.fat * 9 + this.state.protein * 4).toFixed(2))
            } as Row
        )
    }

    render() {
        return (<form noValidate autoComplete="off">
            <Grid container spacing={3}>
                <Grid xs={5}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.state.options}
                        getOptionLabel={(option: any) => option.name}
                        onInputChange={(event, newInputValue) => {

                            fetch(`/products?name=${newInputValue}`, {})
                                .then(r => r.json())
                                .then(r => {
                                    console.log(r)
                                    this.setState({
                                            options: r as Array<Nutrition>
                                        }
                                    )
                                })
                            this.setState((state: Measure, props: any) => {
                                return {selected: newInputValue}
                            })
                        }}
                        renderInput={(params: any) => <TextField {...params} label="Combo box" variant="outlined"/>}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField id="standard-basic" label="protein" value={this.state.protein}/>
                </Grid>
                <Grid item xs={1}>
                    <TextField id="standard-basic" label="carbo" value={this.state.carbo}/>
                </Grid>
                <Grid item xs={1}>
                    <TextField id="outlined-basic" label="fat" value={this.state.fat}/>
                </Grid>
                <Grid item xs={1}>
                    <TextField id="outlined-basic" label="wage" value={this.state.value}
                               onChange={this.handleChange("value")}/>
                </Grid>
                <Grid item xs={1}>
                    <IconButton  onClick={this.saveProduct}>
                        <Add> ADD </Add>
                    </IconButton>
                </Grid>
            </Grid>

        </form>)
    }
}

export default Measurement;