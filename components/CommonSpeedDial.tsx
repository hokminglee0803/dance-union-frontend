import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';

const actions = [
    {
        icon: <WhatsAppIcon style={{ color: 'green' }} />, name: 'WhatsApp', onClick: () => {

        }
    },
    {
        icon: <SendIcon />, name: '報名查詢', onClick: () => {
            window.location.href = `/contact/`
        }
    },
    {
        icon: <EmailIcon style={{ color: 'orange' }} />, name: '電郵', onClick: () => {
            window.location.href = "mailto:danceUnionCms@gmail.com";
        }
    },
    {
        icon: <FacebookIcon style={{ color: 'blue' }} />, name: 'Facebook', onClick: () => {
            window.location.href = 'https://www.facebook.com/sunnykidsdanceunion/'
        }
    },


];

export default function CommonSpeedDial() {
    return (
        <SpeedDial
            ariaLabel="SpeedDial"
            style={{
                position: 'fixed', bottom: 80, right: 35,
            }}
            // onOpen='mouseEnter'
            icon={<ChatIcon fontSize="large" />}

        >
            {actions.map((action) => (
                <SpeedDialAction
                    onClick={action.onClick}
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                />
            ))}
        </SpeedDial>
    );
}
