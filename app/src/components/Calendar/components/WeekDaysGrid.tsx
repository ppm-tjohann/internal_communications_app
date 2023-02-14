import { Grid, Typography } from '@mui/material'



const WeekDaysGrid = () => ( <>
    <Grid container columns={7} sx={{ flexGrow: 0 }} spacing={0}>
        <Grid item xs={1}>
            <Typography variant={'body2'} sx={{ p: 1 }}>monday</Typography>
        </Grid>
        <Grid item xs={1}>
            <Typography variant={'body2'} sx={{ p: 1 }}>tuesday</Typography>
        </Grid>
        <Grid item xs={1}>
            <Typography variant={'body2'} sx={{ p: 1 }}>wednesday</Typography>
        </Grid>
        <Grid item xs={1}>
            <Typography variant={'body2'} sx={{ p: 1 }}>thursday</Typography>
        </Grid>
        <Grid item xs={1}>
            <Typography variant={'body2'} sx={{ p: 1 }}>friday</Typography>
        </Grid>
        <Grid item xs={1}>
            <Typography variant={'body2'} sx={{ p: 1 }}>saturday</Typography>
        </Grid>
        <Grid item xs={1}>
            <Typography variant={'body2'} sx={{ p: 1 }}>sunday</Typography>
        </Grid>
    </Grid>
</> )

export default WeekDaysGrid
