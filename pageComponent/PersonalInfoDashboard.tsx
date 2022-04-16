import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import ItemBar, { MenuListProps } from '../components/ItemBar';
import PersonalInfo, { TabProps } from './PersonInfo';
import ResetPassword from './ResetPassword';


interface PersonalInfoDashboardProps {
}

const menuList: MenuListProps[] = [
    {
        step: 0,
        label: '個人資料'
    },
    {
        step: 1,
        label: '更改密碼'
    },
    {
        step: 2,
        label: '服務紀錄'
    }
];

const personalInfoList: TabProps[] = [
    {
        label: '個人資料'
    },
    {
        label: '更改密碼'
    },
    {
        label: '服務紀錄'
    }

];

const dashboardMenu = (index: number) => {
    switch (index) {
        case 0:
            return <PersonalInfo tabList={personalInfoList} />;
        case 1:
            return <ResetPassword />;
        default:
            return <div>404 not found</div>
    }
}

export default function PersonalInfoDashboard({ }: PersonalInfoDashboardProps) {

    const [step, setStep] = React.useState(0);

    return (
        <Box sx={{ display: 'flex' }}>

            <ItemBar
                step={step}
                setStep={setStep}
                menuList={menuList}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {dashboardMenu(step)}
            </Box>
        </Box>
    );
}