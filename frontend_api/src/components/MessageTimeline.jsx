import React from 'react';
import MessageList from '../containers/MessageList';
import Useraside from '../components/Useraside';

const messageTimeline = props => {
    return(
        <div className="row">
            <Useraside profileImageUrl={props.profileImageUrl} username={props.username}/>
            <MessageList />
        </div>
    )
};

export default messageTimeline;