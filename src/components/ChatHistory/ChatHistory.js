import React from 'react';
import PropTypes from "prop-types";
import Grid from '@mui/material/Grid';

import ChatMessage from './ChatMessage';

const ChatHistory = ({ history }) => {

    console.log('sky debug 1001 history is ', history);

    return (
        <Grid item xs={12} sm={12}>
            { history.map((chat) => {
                return <ChatMessage key={chat.id} message={chat.message} type={chat.type} />
            })}
        </Grid>
    );
}

ChatHistory.propTypes = {
    history: PropTypes.array.isRequired
};

export default ChatHistory;
