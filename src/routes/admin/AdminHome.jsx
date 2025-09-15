import React from "react";
import Header from "../../components/Header";
import Greetings from "../../components/admin/Greetings";
import UsersLists from "../../components/admin/UsersLists";

function AdminHome() {
  return (
    <>
      <Header />
      <Greetings />
      <UsersLists name={'Courier/Rider Lists'}/>
      <UsersLists name={'Customer Lists'}/>
    </>
  );
}

export default AdminHome;
