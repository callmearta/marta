import React from 'react';

function Loading({ loading, children }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }

  return children;
}

export default Loading;
