import React from 'react';
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const OUTBOUND = 'OUTBOUND';

const ChatMessage = ({ message, type, createdDate }) => {

    console.log('sky debug 1001 history is ', history);

    return (
        <Box sx={{
            display: 'grid',
            // width: '60%',
            justifyContent: type === OUTBOUND ? 'end' : 'start',
        }}>
            <Card
                variant={'outlined'}
                classes={type === OUTBOUND ? 'outbound' : 'inbound'}
                sx={{
                    maxWidth: '300px',
                    // width: 'fit-content'
                    borderRadius: type === OUTBOUND ? '0.5rem 0.5rem 0' : '0.5rem 0.5rem 0.5rem 0',
                    backgroundColor: type === OUTBOUND ? '#1976D2' : '#f3f3f3',
                    color: type === OUTBOUND ? 'white' : 'black',
                    marginBottom: '1rem'
                }}>
                <CardContent>{message}</CardContent>
            </Card>
        </Box>
    );
}

ChatMessage.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired
};

export default ChatMessage;
