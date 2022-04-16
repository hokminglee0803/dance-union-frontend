import { Box } from '@mui/system';
import * as React from 'react';
import InputField from '../components/InputField';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import StyledButtonTwo from '../components/Button/StyledButtonTwo';

interface ResetPasswordProps {

}

export default function ResetPassword({ }: ResetPasswordProps) {

    return (
        <div>
            <Box sx={{
                borderBottom: '3px solid orange',
                marginBottom: '3%'
            }}>
                <div style={{
                    fontSize: '25px',
                    fontWeight: 'bold'
                }}>
                    基本個人資料
                </div>
            </Box>
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
        </div>
    );
}