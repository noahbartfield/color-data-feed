import React from 'react';

const colorBlock = ({ colorData }) => {
  const colorString = `rgb(${colorData.R}, ${colorData.G}, ${colorData.B})`;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        margin: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: colorString,
          height: '30px',
          width: '30px',
        }}
      />
      <div>{`${colorData.label}`}</div>
    </div>
  );
};

export default colorBlock;
