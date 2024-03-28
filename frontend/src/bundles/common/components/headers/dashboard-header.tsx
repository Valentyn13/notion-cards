import { AppBar,Toolbar, Typography } from '@mui/material';

import { AccountMenuElement } from '../account-menu/account-menu';

const DashboardHeader = (): JSX.Element => {
    return(
        <AppBar position="sticky">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">Notion Cards</Typography>
            <AccountMenuElement/>
        </Toolbar>
    </AppBar>
    );
};

export { DashboardHeader };