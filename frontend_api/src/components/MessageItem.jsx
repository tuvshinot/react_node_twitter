import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import DefaultImg from '../images/default-profile-image.jpg';
import Aux from '../hocs/Auxilliary';

const messageItem = ({date, profileImageUrl, username, createdAt, text}) => (
   <Aux>
       <li className="list-group-item" id="list-item">
            <img src={profileImageUrl || DefaultImg } alt={username} height="100" width="100" className="timeline-img" />
            <div className="message-area">
                    <Link to='/'>@{username} &nbsp;</Link>
                    <span className="text-muted">
                        <Moment className="text-muted" format="Do MMM YYYY" >
                            {date}                
                        </Moment>
                    </span>
                    <p>{text}</p>
            </div>
       </li>
   </Aux>
);

export default messageItem;