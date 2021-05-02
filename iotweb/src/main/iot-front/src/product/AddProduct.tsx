import React, {useState} from "react";
import {Button, Grid, IconButton, TextField} from "@material-ui/core";
import Add from "@material-ui/icons/Add";

interface ProductAddRequest{
    name: string,
    carbo: number,
    protein: number,
    fat: number
}
export const AddProduct = () => {
    const [product, setProduct] = useState<ProductAddRequest>({
        name: '',
        carbo: 0.0,
        protein: 0.0,
        fat: 0.0
    })

    const handleChange = (prop: any) => (event: any) => {
        setProduct({...product, [prop]: event.target.value});
    };

    const sendAddRequest = () => {
        fetch("/product", {method: "POST", body: JSON.stringify({
                name: product.name,
                carbo: {value: product.carbo, unit: "100g"},
                protein: {value: product.protein, unit: "100g"},
                fat: {value: product.fat, unit: "100g"}
            }),
            headers: {"content-type": "application/json"}
        })
            .then(r => r.json())
    }

    return (
        <Grid container spacing={0}>
            <Grid xs={4}>
            </Grid>
            <Grid xs={3}>
                <Grid xs={12}>
                    <form noValidate>
                        <div style={{padding: "20px"}}>
                            <TextField id="standard-basic" label="Name" required variant="filled" fullWidth
                                       value={product.name} onChange={handleChange("name")}/>
                        </div>
                        <div style={{padding: "20px"}}>
                            <TextField id="filled-basic" label="Protein"  required variant="filled" fullWidth
                                       value={product.protein} onChange={handleChange("protein")}/>
                        </div>
                        <div style={{padding: "20px"}}>
                            <TextField id="outlined-basic" label="Carbo" required variant="filled" fullWidth
                                       value={product.carbo} onChange={handleChange("carbo")}/>
                        </div>
                        <div style={{padding: "20px"}}>
                            <TextField id="outlined-basic" label="Fat" required variant="filled" fullWidth
                                       value={product.fat} onChange={handleChange("fat")}/>
                        </div>

                    </form>

                </Grid>

                <Grid xs={12}>
                    <Grid xs={2} > <Button  onClick={sendAddRequest} color="primary"> ADD </Button></Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}