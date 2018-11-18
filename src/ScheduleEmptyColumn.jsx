import React, { memo } from 'react';

const ScheduleEmptyColumn = ({intervalWithHalf}) => (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        {intervalWithHalf.map((time, index) => 
            <div key={time} style={{position: 'relative', zIndex: '0', width: 'calc((75vw - 200px)/5)', height: '60px', borderTop: (index % 2 === 0) ?  '1px solid #ccc' : '1px dashed #ccc'}}></div>
        )}
    </div>        
);

export default memo(ScheduleEmptyColumn);