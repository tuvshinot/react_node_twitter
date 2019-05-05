import React from 'react';
import DefaultImg from '../images/default-profile-image.jpg';

const useraside = ({username, profileImageUrl}) => {
    return (
        <aside className="col-sm-2">
            <div className="panel panel-default">
                <img src={ DefaultImg} alt={username} width='200' height='200' />
            </div>
        </aside>
    );
}

export default useraside;