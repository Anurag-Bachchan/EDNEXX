import ChangeProfilePicture from "./ChangeProfilePicture"
// import DeleteAccount from "./DeleteAccount"
// import EditProfile from "./EditProfile"
// import UpdatePassword from "./UpdatePassword"

import React from 'react'

const index = () => {
  return (
    <div>
      <h1 className="mb-14 text-3xl mx-auto w-11/12 font-medium text-white ml-20 gap-6">
         Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
   
    </div>
  )
}

export default index
