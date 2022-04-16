import { Box, TextField, IconButton, InputBase, Paper, Grid, Autocomplete, Fab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import * as React from 'react';
import { DesktopDatePicker } from '@mui/lab';
import { district } from '../config/search-bar.config';

export default function useSearchBar() {

    const theme = useTheme();
    const [filter, setFilter] = React.useState({
        keyword: '',
        dateRangeFrom: '',
        dateRangeTo: '',
    })
    const [drawer, setDrawer] = React.useState(false);

    const SearchBarProps = {
        isDrawerOpen: drawer,
        openDrawer: () => setDrawer(true),
        closeDrawer: () => setDrawer(false),
    }

    const SearchPopup = (
        <Box
            sx={{
                width: 'auto',
                background: 'white',
                marginTop: '2%',
                marginBottom: '5%'
            }}
        >
            <Grid
                container
            >
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                        color: 'orange'
                    }}
                >
                    <h3 style={{
                        borderLeft: '10px solid orange',
                        paddingLeft: '10px'
                    }}>
                        關鍵字
                    </h3>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                        marginBottom: '2%'
                    }}
                >
                    <Paper
                        component="form"
                        elevation={0}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            margin: 'auto',
                            border: '2px solid orange',
                            borderRadius: '30px',
                        }}
                    >
                        <IconButton
                            disableTouchRipple
                            disableRipple
                            sx={{ p: '10px', color: 'orange' }}>
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search..."
                        />
                    </Paper>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                        color: 'orange'
                    }}
                >
                    <h3 style={{
                        borderLeft: '10px solid orange',
                        paddingLeft: '10px'
                    }}>
                        服務日期
                    </h3>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                        marginBottom: '2%'
                    }}
                >
                    <DesktopDatePicker
                        label="由"
                        inputFormat="MM/DD/yyyy"
                        value={filter.dateRangeFrom}
                        onChange={(value) => {
                            setFilter({
                                ...filter,
                                dateRangeFrom: value
                            })
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                        color: 'orange'
                    }}
                >
                    <h3 style={{
                        borderLeft: '10px solid orange',
                        paddingLeft: '10px'
                    }}>
                        服務次數
                    </h3>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                    }}
                >
                    <Autocomplete
                        multiple
                        limitTags={2}
                        options={district}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="服務地點" />
                        )}
                        sx={{ width: '500px' }}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                        color: 'orange'
                    }}
                >
                    <h3 style={{
                        borderLeft: '10px solid orange',
                        paddingLeft: '10px'
                    }}>
                        服務地點
                    </h3>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                    }}
                >
                    <Autocomplete
                        multiple
                        limitTags={2}
                        options={district}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="服務地點" />
                        )}
                        sx={{ width: '500px' }}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                        color: 'orange'
                    }}
                >
                    <h3 style={{
                        borderLeft: '10px solid orange',
                        paddingLeft: '10px'
                    }}>
                        服務對象
                    </h3>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                    }}
                >
                    <Autocomplete
                        multiple
                        limitTags={2}
                        options={district}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="服務對象" />
                        )}
                        sx={{ width: '500px' }}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                        color: 'orange'
                    }}
                >
                    <h3 style={{
                        borderLeft: '10px solid orange',
                        paddingLeft: '10px'
                    }}>
                        服務性質
                    </h3>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                    }}
                >
                    <Autocomplete
                        multiple
                        limitTags={2}
                        options={district}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="服務對象" />
                        )}
                        sx={{ width: '500px' }}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                        color: 'orange',
                    }}
                >
                    <h3 style={{
                        borderLeft: '10px solid orange',
                        paddingLeft: '10px'
                    }}>
                        知識／技能
                    </h3>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90%',
                        margin: 'auto',
                    }}
                >
                    <Autocomplete
                        multiple
                        limitTags={2}
                        options={district}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="服務對象" />
                        )}
                        sx={{ width: '500px' }}
                    />
                </Grid>
            </Grid>
        </Box >
    );

    const SearchBar = () => {
        return (
            <div>
                <Paper
                    component="form"
                    elevation={0}
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        border: '2px solid orange',
                        borderRadius: '30px',

                    }}
                >
                    <IconButton
                        onClick={() => setDrawer(true)}
                        sx={{ p: '10px', color: 'orange' }} >
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search..."
                    />
                    <IconButton sx={{ p: '10px', color: 'orange' }}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
        );
    }

    return { SearchBar, SearchPopup, SearchBarProps }
}