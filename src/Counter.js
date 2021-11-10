import React, {useReducer} from 'react';

// 상태 업데이트 로직을 컴포넌트 밖으로 분리함
// 상태를 업데이트 하는 함수
function reducer(state, action) { //현재상태와 action객체를 받아옴
    switch (action.type) { //action type을 읽어옴
        case 'INCREMENT':
            return state + 1; //새로운 상태를 반환
        case 'DECREMENT':   
            return state - 1; 
        default: 
            throw new Error('Unhandled action');
    }
}

function Counter() {
    // 첫번째 파라미터는 reducer 함수, 두번째 파라미터는 기본값
    // number는 현재 상태, dispatch는 액션을 발생시키는 함수
    const [number, dispatch] = useReducer(reducer, 0);

    const onIncrease = () => {
        dispatch({
            type: 'INCREMENT' // type: 어떤 업데이트를 진행할지 명시
        })
    };

    const onDecrease = () => {
        dispatch({
            type: 'DECREMENT'
        })
    };
    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;
