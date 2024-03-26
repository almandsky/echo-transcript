import React from 'react';
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const OUTBOUND = 'OUTBOUND';

const ChatMessage = ({ message, type, createdDate, user }) => {

    return (
        <Box sx={{
            display: 'grid',
            justifyContent: type === OUTBOUND ? 'end' : 'start',
            marginBottom: '1rem'
        }}>
            <Card
                variant={'outlined'}
                className={type === OUTBOUND ? 'outbound' : 'inbound'}
                sx={{
                    maxWidth: '80%',
                    width: 'fit-content',
                    borderRadius: type === OUTBOUND ? '0.5rem 0.5rem 0' : '0.5rem 0.5rem 0.5rem 0',
                    backgroundColor: type === OUTBOUND ? '#1976D2' : '#f3f3f3',
                    color: type === OUTBOUND ? 'white' : 'black',
                }}>
                <Box sx={{ p: '0.5rem' }}>{message}</Box>
            </Card>
            <Typography variant="caption" sx={{ marginLeft: '0.5rem', marginTop: '0.125rem' }}>{user} • {createdDate}</Typography>
        </Box>
    );
}

ChatMessage.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
};

export default ChatMessage;
