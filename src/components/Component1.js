import { Box, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


import LinearProgress from '@mui/material/LinearProgress';



import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Pagination } from '@mui/material';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    '@media (min-width: 780px)': {
        width: '80%'
    },

    mainbox1: {
        width: "100%",
        minHeight:"fit-content",
        marginBottom:10,
       
    },
    box1: {
        height: "100%",
        width: "100%",
        border: "2px solid black",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding:20
    },

    postsEle: {
        '&:hover': {
            cursor: "pointer",
        },
    },

    postsEleTitle:{
        color:"black",
        textDecoration:"none",
        '&:hover': {
            textDecoration:"underline",
        },
    }



}));











const Component1 = () => {

    const classes = useStyles();

    const [postLoading, setPostLoading] = useState(false);
    const [postData, setPostData] = useState([]);


    const handlePost = async () => {
        setPostLoading(false);
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPostData(data);
        setPostLoading(true);
    }

    useEffect(() => {
        handlePost();
    }, [])




    //Pagination Part

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost);




    //Coment Popup Part
    const [commentLoading, setCommentLoading] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);
    const [CommentLists, setCommentLists] = useState([])
    const handleClose = () => {
        setCommentOpen(false);
    };


    const handleCommentArray = async (id1) => {
        setCommentLoading(false);
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id1}/comments`);
        console.log(data)
        setCommentLists(data);
        setCommentLoading(true);
    }


    const handleCommentClick = (e) => {
        setCommentOpen(true);
        handleCommentArray(e.target.id);
    }




    





    return (
        <>

            <div style={{ display: "none" }}>
                <Dialog open={commentOpen} onClose={handleClose} >
                    <DialogTitle>Comments</DialogTitle>
                    <DialogContent >


                        {
                            (!commentLoading) ? (
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>
                            ) : (
                                <>
                                    {
                                        CommentLists.map((item, index) => {

                                            return (
                                                <DialogContent key={item.id} style={{border:"1px solid black"}}>
                                                    <DialogContentText style={{fontSize:18,color:"black",marginBottom:12}}>{item.name}</DialogContentText>
                                                    <DialogContentText style={{marginBottom:12}}>{item.email}</DialogContentText>
                                                    <DialogContentText>{item.body}</DialogContentText>
                                                </DialogContent>
                                            )

                                        })
                                    }
                                </>



                            )
                        }







                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Done</Button>
                    </DialogActions>
                </Dialog>
            </div>

            {
                (!postLoading) ? (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <>
                        <div className={classes.mainbox1}>
                            <div className={classes.box1}>
                                {
                                    currentPosts.map((item, index) => {

                                        return (
                                            <div key={item.id} className={classes.postsEle} style={{ border: "5px solid black", width: 383, height: "22%" ,padding:10}}>
                                                <Link className={classes.postsEleTitle}  id={item.userId} to={"/info/"+item.id}  target="_black">{item.title}</Link>
                                                <p>{item.body}</p>
                                                <Stack spacing={2} direction="row">

                                                    <Button variant="contained" id={item.id} onClick={handleCommentClick}>Comments</Button>

                                                </Stack>
                                            </div>
                                        )

                                    })
                                }
                            </div>



                        </div>
                        <div style={{ height: 62, width: "94%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Stack spacing={2}>

                                <Pagination count={10} color="primary"
                                    onChange={(e, value) => { setCurrentPage(value) }}
                                />


                            </Stack>
                        </div>
                    </>

                )


            }



        </>
    )
}

export default Component1