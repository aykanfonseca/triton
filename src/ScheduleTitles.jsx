import React, { memo } from 'react';

const ScheduleTitles = ({isNotFinalSchedule, theme}) => (
    <div style={{marginTop: isNotFinalSchedule ? '30px' : '0px', display: 'flex', color: theme === '' ? '#333' : '#fff', backgroundColor: theme === '' ? '#f7f7f7' : '#333', borderBottom: theme === '' ? '1px solid #dedede' : '1px solid #444'}}>
        <div style={{width: '100px', borderTop: theme === '' ? '1px solid #dedede' : '1px solid #444', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: theme === '' ? '1px solid #dedede' : '1px solid #444', cursor: isNotFinalSchedule ? 'pointer' : 'default'}}></div>
        <b style={{width: 'calc((75vw - 200px)/5)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderTop: theme === '' ? '1px solid #dedede' : '1px solid #444'}}>Monday</b>
        <b style={{width: 'calc((75vw - 200px)/5)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderTop: theme === '' ? '1px solid #dedede' : '1px solid #444'}}>Tuesday</b>
        <b style={{width: 'calc((75vw - 200px)/5)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderTop: theme === '' ? '1px solid #dedede' : '1px solid #444'}}>Wednesday</b>
        <b style={{width: 'calc((75vw - 200px)/5)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderTop: theme === '' ? '1px solid #dedede' : '1px solid #444'}}>Thursday</b>
        <b style={{width: 'calc((75vw - 200px)/5)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderTop: theme === '' ? '1px solid #dedede' : '1px solid #444'}}>Friday</b>
    </div>
);

export default memo(ScheduleTitles);