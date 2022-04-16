import { tabUnstyledClasses } from '@mui/base';
import { Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import InputField from '../components/InputField';
import { AccountCircle as AccountCircleIcon, Password as PasswordIcon } from '@mui/icons-material';
import StyledButtonOne from '../components/Button/StyledButtonOne';
import StyledButtonTwo from '../components/Button/StyledButtonTwo';

export interface TabProps {
    label: string;
}

interface PersonalInfoProps {
    tabList: TabProps[];
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


export default function PersonalInfo({ tabList }: PersonalInfoProps) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{
                borderBottom: '3px solid orange'
            }}>
                <div style={{
                    float: 'left',
                    fontSize: '25px',
                    fontWeight: 'bold'
                }}>
                    基本個人資料
                </div>
                <Tabs value={value}
                    onChange={handleChange}
                    sx={{
                        background: 'orange',
                        borderRadius: '20px 20px 0px 0px',
                        width: '65%',
                        margin: 'auto',
                        marginRight: 0,

                    }}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "transparent",
                        }
                    }}
                >
                    {
                        tabList.map(item => {
                            return <Tab
                                sx={{
                                    color: 'white',
                                    width: '33.3%',
                                    [`&.${tabUnstyledClasses.selected}`]: {
                                        backgroundColor: '#FF7200',
                                        color: 'white',
                                    }
                                }}
                                label={item.label} />
                        })
                    }
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box>
                    <Box>
                        <InputField
                            label='姓名(中文)'
                            name='email'
                            autoComplete='email'
                            type="email"
                            placeholder='登入電郵'
                            icon={<AccountCircleIcon fontSize='medium' />}
                        />
                        <InputField
                            label='姓名(英文)'
                            name='email'
                            autoComplete='email'
                            type="email"
                            placeholder='登入電郵'
                            icon={<AccountCircleIcon fontSize='medium' />}
                        />
                        <InputField
                            label='出身月份'
                            name='email'
                            autoComplete='email'
                            type="email"
                            placeholder='登入電郵'
                            icon={<AccountCircleIcon fontSize='medium' />}
                        />

                        <div style={{
                            width: '140px',
                            height: '100px',
                            marginTop: '50px',
                        }}>
                            <StyledButtonTwo
                                label={'提交'}
                                onClick={() => {
                                    console.log('Login');
                                }}
                            />
                        </div>

                    </Box>
                </Box>
            </TabPanel>
        </div>
    );
}