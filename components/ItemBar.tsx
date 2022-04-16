import * as React from 'react';
import { List, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';

export interface MenuListProps {
    step: number;
    label: React.ReactNode;
}

export interface ItemBarProps {
    step: number;
    setStep: (index: number) => void;
    menuList: MenuListProps[];
}
export default function ItemBar({ step, setStep, menuList }: ItemBarProps) {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <div>
            {
                isDesktop ?
                    <List
                        sx={{
                            width: '200px',
                            height: '100%',
                            minHeight:'1000px',
                            background: '#FFB52E',
                            borderRadius: '20px 20px 0px 0px',
                            marginRight: 2,
                            marginLeft: 10,
                            color: 'white'
                        }}
                        component="nav"
                    >
                        <div style={{ marginTop: '30%' }} />
                        {
                            menuList.map((item) => {
                                return <>
                                    <ListItemButton style={{
                                        background: item.step === step ? '#FF9200' : '#FFB52E',
                                        borderRadius: '10px',
                                    }}
                                        onClick={() => setStep(item.step)}
                                    >
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                    <div style={{ marginTop: '10%' }} />
                                </>
                            })
                        }
                    </List> : ""
            }
        </div>
    );
}