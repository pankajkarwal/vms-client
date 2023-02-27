import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import { Card } from '@mui/material';
import CardDetail from './CardDetail';
import {loadCards} from '../services/CardService'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ArticleList() {
    const [data, setData] = useState([]);
    useEffect(() => {
        loadCards()
            .then((res) => {
                console.log("Response is ", res.data);
                setData(res.data)
            })
    }, [])
    return (
        <div>
            List of Articles in cards DataGrid
            <Container>

                <Grid container >
                    {data.map((item, index) => {
                        return (
                            <Item><Card variant="outlined">
                                <CardDetail
                                    date={item.date}
                                    link={item.link}
                                    title={item.title.rendered}
                                    excerpt={item.excerpt.rendered}
                                    image={item.jetpack_featured_media_url}
                                    creator={item.author} />
                            </Card></Item>
                        )
                    })}


                </Grid>
            </Container>
        </div>
    )
}
