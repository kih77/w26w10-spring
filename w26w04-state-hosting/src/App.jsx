import './App.css'
import { useState } from 'react'

function App() {
  // counts 상태를 배열로 관리
  const [counts, setCounts] = useState([0, 0, 0, 0])
  
  // // index에 해당하는 counts 값을 1 증가시키는 함수 그니까 변수에다가 함수를 넣음.
  // const onIncrement = (index) => {
  //   // 상태를 업데이트할 때는 항상 새로운 배열을 만들어서 설정
  //   setCounts(prevCounts => { //비동기 처리
  //     const newCounts = [...prevCounts] // Spread syntax로 배열 복사 새로운 counts를 만드는 것
  //     newCounts[index] += 1

  //     return newCounts
  //   })
  // }

  // map 메서드를 사용하여 불변성을 유지하면서 특정 인덱스의 값만 증가
  const onIncrement = (index) => {
    setCounts(prevCounts => //비동기 처리 위함
      prevCounts.map((count, i) => //.map을 사용함. 얘는 항상 무언가 새로 만들어서 반환함. 똑같은 크기로 무언가를 만들고(무언가를 채우느냐가 문제) 첫 번째는 count, i인데 indexsms 0, 1, 2라고 생각하면 됨. count인데 안의 요소들이 counts임.
        i === index ? count + 1 : count //i가 true면 앞에걸, i가 false면 뒤에걸 반환. 그리고 이걸 반환함. 그럼 counts가 반환한 놈을 가리키게 됨. 그럼 상태가 반환되었다는 걸 인지함. 이제 화면을 다시 그려야 한다는 걸 인지함
      )
    )
  }

  // counts 배열의 모든 값을 더함
  const total = counts.reduce((sum, current) => sum + current, 0) //각각을 돌면서 수행함. 초기값을 0으로 넣어주고, sum하고 current를 받아서 처리. 처음엔 sum 0이었는데 다음걸로 바뀌었으니 sum에 계속 값을 누적해나가며 계산해나간다. 라는 것임! 그걸 total에다가 집어넣겠다, 라는 뜻.

  return (
    <div>
      <h1>총합: {total}</h1>
      {
        // map 메서드로 counts 배열을 순회하며 Counter 컴포넌트 렌더링
        counts.map((count, index) => (
          <Counter
            // key는 React에서 항목을 식별하고 렌더링할 때 필요하지만, 
            // Counter 컴포넌트에는 전달되지 않음
            key={index} // index를 key로 사용 (실제 앱에서는 고유한 id 사용 권장) 이거 좀 특이함. counter에 보면 key가 없은. 근데 여기에서는 key가 잇어야 함. map이나 react처럼 자동으로 무언가를 배열로 만들 때, 어떤 게 어떤 건지 알아야 함. 각각을 구분하기 위해 필요한 것. index를 값 하나하나에 붙여주는 것. 실제로 만들 땐 조심해야 한다. 이건 동작은 하는데.... 일반적으론 데이터베이스에 primarykey를 부여함. 근데 없으니 궁여지책으로 이걸 쓴 것. 그래서 썩 좋은 방법은 아니다.
            count={count}
            onIncrement={() => { onIncrement(index) }}
          />
        ))
      }
    </div>
  )
}

function Counter({ count, onIncrement }) {
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={onIncrement}>
        증가
      </button>
    </div>
  )
}

export default App
