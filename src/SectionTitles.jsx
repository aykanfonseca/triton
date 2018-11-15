import React, { memo } from 'react';

const SectionTitles = () => (
    <div style={{display: 'inline-flex', flexDirection: 'row', height: '25px', fontWeight: '600'}}>
        <div style={{width: '45px'}}></div>
        <div className="block" style={{width: '90px', textIndent: '20px'}}>
            {"ID"}
        </div>
        <div className="block" style={{width: '70px'}}>
            {"Section"}
        </div>
        <div className="block" style={{width: '60px'}}>
            {"Type"}
        </div>
        <div className="block" style={{width: '50px'}}>
            {"Days"}
        </div>
        <div className="block" style={{width: '200px', textIndent: '20px', justifyContent: 'left'}}>
            {"Time"}
        </div>
        <div className="block" style={{width: '100px', justifyContent: 'left'}}>
            {"Location"}
        </div>
        <div className="block" style={{width: '200px', textIndent: '20px', justifyContent: 'left'}}>
            {"Instructor"}
        </div>
        <div className="block" style={{width: '100px'}}>
            {"Seats"}
        </div>
    </div>  
);

export default memo(SectionTitles);