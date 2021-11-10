import React, {useRef, useReducer, useMemo, useCallback} from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';
import useInputs from './useInputs';

function countActiveUsers(users) {
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'sky',
      email: 'sky@email.com',
      active: true
  },
  {
      id: 2,
      username: 'sun',
      email: 'sun@email.com',
      active: false
  },
  {
      id: 3,
      username: 'moon',
      email: 'moon@email.com',
      active: false
  }
  ]
}

//액션 객체를 기반으로 상태 업데이트 하기
function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id
          ? {...user, active: !user.active}
          : user
        )
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    // 초깃값 지정
    username: '',
    email: ''
  });
  const {username, email} = form; //username, email을 form에서 추출
  const nextId = useRef(4); 
  const {users} = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;

    reset(); // useInputs 컴포넌트의 reset호출
  }, [username, email, reset]) 

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser 
        username={username} 
        email={email} 
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList 
        users={users} 
        onToggle={onToggle}
        onRemove={onRemove}
      /> 
      <div>활성 사용자 수 : {count}</div> 
    </>
  );
}

export default App;

