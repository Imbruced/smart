import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Grid} from "@material-ui/core";
import PrimarySearchAppBar from "../common/NavBar";
import AddMealCard from "../calories/AddMealCard";
import {AddProduct} from "../product/AddProduct";
import {DailySummary} from "../dailysummary/DailySummary";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function ApplicationNav() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (

        <Grid container spacing={0}>
            <Grid xs={12}>
                <PrimarySearchAppBar/>
            </Grid>
            <Grid xs={2}>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    className={classes.tabs}
                >
                    <Tab label="Add Meal" {...a11yProps(0)} />
                    <Tab label="Add Product" {...a11yProps(1)} />
                    <Tab label="Daily Summary" {...a11yProps(2)} />
                </Tabs>
            </Grid>
            <Grid xs={10}>
                <TabPanel value={value} index={0}>
                    <AddMealCard/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AddProduct/>
                </TabPanel>
                <TabPanel index={2} value={value}>
                    <DailySummary/>
                </TabPanel>
            </Grid>

        </Grid>
    );
}