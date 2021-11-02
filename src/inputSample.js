import React, {useState, useRef} from 'react';

function InputSample() {
    const [inputs, setInput] = useState({
        name: '',
        nickname: ''
    });
    const nameInput = useRef(); // nameInput이라는 객체가 만들어짐
    const {name, nickname} = inputs; //비구조화 할당을 통해 추출하기

    const onChange = (e) => {
        const {name, value} = e.target; // e.target에서 name, value값을 추출
        
        // 리액트에서 객체 업데이트하기
        setInput({
            ...inputs, // spread 연산자. inputs 가 복사되어서 옴
            [name]: value // name값에 따라 key 값이 변경됨
        });
        
    }

    const onReset = () => {
        setInput({
            name: '',
            nickname: ''
        });
        nameInput.current.focus(); // current: DOM을 가리키게 됨
    }
    return (
        <div>
            <input 
                name="name" 
                placeholder="이름" 
                onChange={onChange} 
                value={name}
                ref={nameInput} // 접근하고 싶은 DOM에 작성
            />
            <input 
                name="nickname" 
                placeholder="닉네임" 
                onChange={onChange} 
                value={nickname}
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;
