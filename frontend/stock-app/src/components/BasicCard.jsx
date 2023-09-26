import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import './BasicCard.css'

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCard({ prop }) {
    if (!prop) {
        return null;
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={2} sm={2} md={2} lg={2}>
            </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8}>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                            Stock Name : {prop.name}
                        </Typography>
                        <Typography variant="body7">
                            Stock information :<span></span>
                            {prop.info}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <span className='price_span'>Current Stock Price : <Button size="large">{prop.Price}</Button></span>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
            </Grid>
        </Grid>
    );
}