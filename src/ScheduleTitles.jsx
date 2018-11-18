import React, { memo } from 'react';

const ScheduleTitles = ({isNotFinalSchedule}) => (
    <div style={{marginTop: isNotFinalSchedule ? '30px' : '0px', display: 'flex', color: '#333', backgroundColor: '#f7f7f7', borderBottom: '1px solid #dedede'}}>
        <div style={{width: '100px', borderTop: '1px solid #dedede', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #dedede', cursor: isNotFinalSchedule ? 'pointer' : 'default'}}>
        </div>
        <div style={{width: 'calc((75vw - 200px)/5)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderTop: '1px solid #dedede'}}><b>Monday</b></div>
        <div style={{width: 'calc((75vw - 200px)/5)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderTop: '1px solid #dedede'}}><b>Tuesday</b></div>
        <div style={{width: 'calc((75vw - 200px)/5)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderTop: '1px solid #dedede'}}><b>Wednesday</b></div>
        <div style={{width: 'calc((75vw - 200px)/5)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderTop: '1px solid #dedede'}}><b>Thursday</b></div>
        <div style={{width: 'calc((75vw - 200px)/5)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderTop: '1px solid #dedede'}}><b>Friday</b></div>
    </div>
);

export default memo(ScheduleTitles);