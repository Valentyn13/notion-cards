import { AppBar, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { useAppSelector } from '../../hooks/hooks';

const GuestHeader = (): JSX.Element => {
    const user = useAppSelector((state) => state.auth.user);
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5">Notion Cards</Typography>
                {user ? (
                    <Button color='warning' variant='contained'>Dashboard</Button>

                ) : (
                    <Button
                    sx={{ backgroundColor: 'white', color: 'darkblue' }}
                    variant="contained"
                >
                    Log In
                </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export { GuestHeader };
