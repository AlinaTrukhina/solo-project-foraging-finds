<div>
{/* If no user is logged in, show these links */}
{!user.id && (
  // If there's no user, show login/registration links
  <Link className="navLink" to="/login">
    Login / Register
  </Link>
)}

{/* If a user is logged in, show these links */}
{user.id && (
  <>
    <Link className="navLink" to="/user">
      Home
    </Link>

    <Link className="navLink" to="/info">
      Info Page
    </Link>

    <LogOutButton className="navLink" />
  </>
)}

<Link className="navLink" to="/about">
  About
</Link>
</div>