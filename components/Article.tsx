import * as React from 'react';

export enum FloatProps {
    LEFT,
    RIGHT
}

export interface ArticleProps {
    title: string;
    position: FloatProps;
    description: string;

}

export default function Article({ title, position, description }: ArticleProps) {
    return <>
        <div style={{
            width: '70%',
            margin: 'auto',
            borderBottom: '3px solid orange',
            fontSize: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '5px',
            marginBottom: '10px',
        }}>
            {title}
        </div>
        <div
            style={{
                width: '80%',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginBottom: '10px',
            }}
            dangerouslySetInnerHTML={{ __html: description }} />

    </>
}