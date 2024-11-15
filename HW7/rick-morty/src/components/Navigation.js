import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Navigation = () => (
    <Drawer variant="permanent" anchor="left">
        <List>
            <ListItem button component={Link} to="/">
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/heroes">
                <ListItemText primary="Heroes" />
            </ListItem>
            <ListItem button component={Link} to="/about">
                <ListItemText primary="About" />
            </ListItem>
        </List>
    </Drawer>
);

export default Navigation;
