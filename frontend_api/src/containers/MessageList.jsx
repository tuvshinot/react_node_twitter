import React, { Component } from 'react';
import {fetchMessages} from '../store/actions/messages';
import {connect} from 'react-redux';
import MessageItem from '../components/MessageItem';
import Spinner from '../components/Spinner/Spinner';

class MessageList extends Component {

    componentDidMount() {
        this.props.fetchMessages()
    }

    render() {
        const { messages } = this.props;
        let messageList = messages.map(m => {
            return <MessageItem 
                key={m._id} 
                date={m.createdAt} 
                text={m.text} 
                username={m.userId.username} 
                profileImageUrl={m.userId.profileImageUrl} 
            />
        });

        if(this.props.loading) {
            messageList = <Spinner />
        }

        return (
            <div className="row col-sm-8">
                <div className="offset-1 col-sm-10">
                    <ul className="list-group" itemID="messages">
                        {messageList}
                    </ul>
                </div>
            </div>  
        );
    }

}


const mapStateToProps = state => {
    return {
        messages : state.messages.messages,
        loading : state.messages.loading
    }
};

export default connect(mapStateToProps, {fetchMessages})(MessageList);