import React from 'react';
import PropTypes from "prop-types";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ChatMessage from './ChatMessage';

const ChatHistory = ({ history }) => {

    return (
        // history && history.length > 0 && 
        
        <Box>
            <Typography variant="overline" sx={{ marginLeft: '1rem', backgroundColor: 'white', p: 0.5 }}>Chat History</Typography>
            <Grid item xs={12} sm={12} sx={{ border: 1, borderColor: 'rgba(0, 0, 0, 0.12)', borderRadius: 1, p: 1, marginTop: '-1rem', minHeight: 100 }}>
                { history.map((chat) => {
                    return <ChatMessage
                                key={chat.id}
                                message={chat.message}
                                type={chat.type}
                                createdDate={chat.createdDate}
                                user={chat.user} />
                })}
            </Grid>
        </Box>
    );
}

ChatHistory.propTypes = {
    history: PropTypes.array.isRequired
};

export default ChatHistory;
