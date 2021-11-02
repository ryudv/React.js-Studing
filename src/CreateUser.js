import React from 'react';

//필요한 값들을 prop으로 받아와서 사용
function CreateUser({username, email, onChange, onCreate}) {
    return (
        <div>
            <input 
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username} 
            />
            <input 
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email} 
            />
            <button onClick={onCreate}>등록</button>
        </div>
    )
}

export default React.memo(CreateUser);