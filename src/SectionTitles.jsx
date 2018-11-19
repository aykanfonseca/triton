import React, { memo } from 'react';

const SectionTitles = () => (
    <div style={{display: 'inline-flex', height: '25px', fontWeight: '600'}}>
        <div style={{width: '45px'}}></div>
        <div className="block" style={{width: '90px'}}>
            {"ID"}
        </div>
        <div className="block" style={{width: '70px'}}>
            {"Section"}
        </div>
        <div className="block" style={{width: '60px'}}>
            {"Type"}
        </div>
        <div className="block" style={{width: '200px'}}>
            {"When"}
        </div>
        <div className="block" style={{width: '100px'}}>
            {"Where"}
        </div>
        <div className="block" style={{width: '250px'}}>
            {"Instructor"}
        </div>
        <div className="block" style={{width: '100px'}}>
            {"Seats"}
        </div>
    </div>  
);

export default memo(SectionTitles);