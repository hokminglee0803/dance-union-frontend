import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import { FAQType } from '../interface/FAQ';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQProps {
    faq: FAQType;
}

export default function FAQ({ faq }: FAQProps) {

    const router = useRouter();

    const { t } = useI18n();

    const { locale } = router;

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Grid
            sx={{
                width: '90%',
                margin: 'auto',
                marginTop: '50px'
            }}
            container>
            <Grid item xs={12}>
                {
                    faq?.contents?.map((item, index) => {
                        return <Grid
                            key={index}
                            container
                            spacing={0}
                            direction="column"
                            alignItems="flex-start"
                            justifyContent="center"
                        >
                            <Grid
                                sx={{
                                    marginBottom: '30px'
                                }}
                                item xs={12}>
                                <div dangerouslySetInnerHTML={{ __html: item.title }} />
                            </Grid>
                            <Grid
                                sx={{
                                    marginBottom: '30px'
                                }}
                                item xs={12}>
                                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                            </Grid>
                        </Grid>
                    })
                }
            </Grid>
            {
                faq?.faqTitle ? <Grid
                    item xs={12}>
                    <div dangerouslySetInnerHTML={{ __html: faq.faqTitle }} />
                </Grid> : ""
            }
            <Grid
                sx={{
                    marginBottom: '30px',
                }}
                item xs={12}>
                {
                    faq?.questions?.map((item, index) => {
                        return <Accordion
                            key={index}
                            elevation={0}
                            variant={'outlined'}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>{item.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                            >
                                <Typography>
                                    {item.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    })
                }

            </Grid>
        </Grid>
    )
}