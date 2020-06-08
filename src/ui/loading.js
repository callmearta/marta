import React from 'react';

function Loading(props) {
    if (props.loading) {
        return <div className="loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>;
    } else {
        return props.children;
    }
}

export default Loading;