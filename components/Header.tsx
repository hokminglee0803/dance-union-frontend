import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useMediaQuery, useTheme } from '@mui/material';
import MenuItem from './MenuItem';
import MenuBottom from './MenuIButtom';
import MenuDropDownItem from './MenuDropDownItem';

export default function MenuAppBar() {

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div>
      {
        isDesktop ?
          <AppBar
            position="fixed"
            elevation={1}
            style={{
              background: 'transparent',
              boxShadow: 'none',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Toolbar
              sx={{ justifyContent: 'space-between' }}
              style={{
                margin: "auto",
                border: '1px solid lightGrey',
                borderRadius: '1px 1px 15px 15px',
                background: 'white',
                width: '90%'
              }}
            >
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/"
                sx={{ fontSize: 30, color: 'black' }}
              >
                {'Company'}
              </Link>
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <MenuItem
                  href='/'
                  label='關於我們'
                />
                <MenuItem
                  href='/'
                  label='活動報名'
                />
                <MenuDropDownItem
                  label='更多'
                />
                <MenuBottom
                  href='/login'
                  label='登入'
                />

              </Box>
            </Toolbar>
          </AppBar>
          :
          <AppBar
            position="fixed"
            elevation={1}
            style={{
              background: 'transparent',
              boxShadow: 'none',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Toolbar
              sx={{ justifyContent: 'space-between' }}
              style={{
                margin: "auto",
                border: '1px solid lightGrey',
                borderRadius: '1px 1px 15px 15px',
                background: 'white',
                width: '80%'
              }}
            >
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/premium-themes/onepirate/"
                sx={{ fontSize: 30, color: 'black' }}
              >
                {'Company'}
              </Link>

            </Toolbar>
          </AppBar>

      }
    </div>
  );
}