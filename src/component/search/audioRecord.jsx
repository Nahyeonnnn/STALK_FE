import React, { useEffect, useState } from 'react';

const audioRecord = () => {
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [onRec, setOnRec] = useState(true);
    const [source, setSource] = useState();
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();

    const onRecAudio = () => {
        const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    }

    return (
        <>
            
        </>
    );
};

export default audioRecord;