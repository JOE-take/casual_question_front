import React from 'react'
import { useUser } from './UserContent'
import { Link } from 'react-router-dom';

function Nav() {
  const { user } = useUser();

  if (user && user.userId && user.userName && user.accessToken) {
    return (
      <div>
        <nav>
          <Link to="/">ホーム</Link>
        </nav>
      </div>
    )
  }
  return (
    <div>
      <nav>
        <Link to="/">ホーム</Link>
        | <Link to="/signup">サインアップ</Link>
        | <Link to="/login">ログイン</Link>
      </nav>
    </div>
  )
}

export default Nav;