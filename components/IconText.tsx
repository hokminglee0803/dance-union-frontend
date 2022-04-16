import * as React from 'react';

interface IconTextProps {
    icon: React.ReactNode;
    text: string | React.ReactNode;
    style?: React.CSSProperties;
}

export default function IconText({ icon, text, style }: IconTextProps) {

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            fontSize: '13px',
            ...style
        }}>
            {icon}
            &nbsp;
            <span style={{
                alignItems: 'center',
            }}>{text}</span>
        </div>
    );
}