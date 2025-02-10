import Header from './components/layout/header'
import Footer from './components/layout/footer'
import { Outlet } from 'react-router-dom'
import { getAccountAPI } from './components/services/api.service'
import { useContext, useEffect } from 'react'
import { AuthContext } from './components/context/auth.Context'
import { Spin } from 'antd'
const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  useEffect(() => {
    fetchUserInfo();
  }, [])

  // const delay = (miliSecond) =>{
  //   return new Promise((resolve) =>{
  //     setTimeout(() =>{
  //       resolve(true);
  //     }, miliSecond)
  //   })
  // }
  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    //await delay(3000)
    if (res.data) {
      //success
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  }
  return (
    <>
      {isAppLoading === true ?
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Spin />
        </div>
        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }
    </>
  )
}

export default App

/* 
-props: là một object chứa các thuộc tính của component được truyền vào từ component cha sang component con
vd: <TodoData age={age} todoList={todoList} /> : truyền 2 props age và todoList vào component TodoData

-useState: là một hook của react giúp chúng ta quản lý state trong functional component
-usesState trả về một mảng gồm 2 phần tử, phần tử đầu tiên là giá trị của state, 
phần tử thứ 2 là hàm để thay đổi giá trị của state
*/