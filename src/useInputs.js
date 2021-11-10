import { useState, useCallback } from 'react';

function useInputs(initialForm) {
    const [form, setForm] = useState(initialForm);
    const onChange = useCallback(e => { 
        const {name, value} = e.target; 
        setForm(form => ({...form, [name]: value})); // form업데이트
    }, []); 

    // form을 초기화시키는 reset함수
    const reset = useCallback(() => setForm(initialForm), [initialForm]);

    return [form, onChange, reset];
};

export default useInputs;