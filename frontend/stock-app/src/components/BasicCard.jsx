import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
        <Card sx={{ minWidth: 275 }}>
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
                Current Stock Price : <Button size="large">{prop.Price}</Button>
            </CardActions>
        </Card>
    );
}