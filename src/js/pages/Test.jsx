import React from 'react'
import Request from '../libraries/Request'
import Auth from '../libraries/models/Auth'
import User from '../libraries/models/User';
import Current from '../libraries/models/Current';
import TurkeyProvDist from '../libraries/tools/TurkeyProvDist';


export default function Test() {
  //b BASIC TESTS ----------------------------
  const loginTest = async () => {
    console.log("GET");

    let resp = Request.loginRequest();
    console.log(resp);

    let get = await resp.get({
      username: "Hakan",
      password: "12345678"
    })
    if(get === null) {
      console.log("a")
    }

    localStorage.setItem('token', get.Data.token)
    console.log(get)
  }

  const registerTest = async () => {
    console.log("POST");

    let resp = Request.registerRequest();
    console.log(resp);

    let post = await resp.post({
      username: "Hakan",
      password: "12345678"
    })
    console.log(post);
  }

  const editTest = async () => {
    console.log("EDIT");

    let resp = Request.userRequest();
    console.log(resp);

    let edit = await resp.put({
      username: "Hakan",
      data: {
        password : "123456789",
      }
    })
    console.log(edit)
  }

  const deleteTest = async () => {
    console.log("DELETE");

    let resp = Request.registerRequest();
    console.log(resp);

    let dlt = await resp.delete()
    console.log(dlt);
  }

  const allUserTests = async () => {
    await registerTest();
    await loginTest();
    await editTest();
    await deleteTest();
  }

  //b AUTH ----------------------------------
  const authLogin = async () => {
    let resp = await Auth.login('Hakan', '12345678')
    console.log(resp);
  }

  const getLocalUser = () => {
    let resp = Auth.getLocalUser();
    console.log(resp)
  }
  
  const authLogout = async () => {
    let resp = await Auth.getLocalUser().logout();
    console.log(resp);
  }

  const refreshUserDetails = async () => {
    let resp = await Auth.getLocalUser().refreshDetails()
  }

  //b USER ----------------------------------
  const showUser = async () => {
    let where = 
    {
      where:{username: 'hakan'} //. lowercase 
    }

    let resp = await User.showUser(where);
    let resp_all = await User.showUser();
    
    console.log(resp)     //. Tekli
    console.log(resp_all) //. Çoklu
  }

  const createUser = async () => {
    let resp = await User.createUser('Deneme1', '12345678')
    console.log(resp)
  }

  const editUser = async () => {
    let details = await User.getUserDetails('Deneme1')
    let changes = {
      password : "123456789"
    }
    
    let resp = await details.editUser(changes);
    console.log(resp)
  }

  const deleteUser = async () => {
    let resp = await User.getUserDetails('Deneme1')
    let rmv = await resp.removeUser()
    console.log(rmv)
  }

  //b CURRENT ------------------------------
  const showCurrent = async () => {
    let where = 
    {
      where:{}
    }

    let resp = await Current.showCurrent(where)
    console.log(resp)
  }

  const createCurrent = async () => {
    let data = {
      name: "Test-15",
      address: "",
      province: "",
      district: "",
      tax_office: "",
      tax_no: "",
      identification_no: "",
      phone: "",
      phone_2: "",
      mail: "a@a.com",
      description: "",
      code_1: "",
      code_2: "",
      code_3: "",
      code_4: "",
    }

    let resp = await Current.createCurrent(data);
    console.log(resp)
  }

  const editCurrent = async () => {
    let details = await Current.getCurrent(896)
    let changes = {
      name : "Deneme-16"
    }

    let resp = await details.editCurrent(changes)
    console.log(resp);
  }

  const deleteCurrent = async () => {
    let resp = await Current.getCurrent(892)
    let rmv = await resp.removeCurrent();
    console.log(rmv);
  }

  //b TOOLS -------------------------

  const getProvinceList = () => {
    let resp = new TurkeyProvDist()
    console.log(resp.getProvinceList())
  }

  const getDistrictList = () => {
    let resp = new TurkeyProvDist()
    console.log(resp.getDistrictList('Adana'));
  }

  //b -------------------------------
  return (
    <div className='bg-fogra_dark w-screen h-screen p-3'>

      <div className='p-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>REQUEST TESTS</h1>

        <button onClick={loginTest}  
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Login Test (GET)
        </button>

        <button onClick={registerTest}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Register Test (POST)
        </button>

        <button onClick={editTest}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Edit Test (PUT)
        </button>

        <button onClick={deleteTest}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Register Test (DELETE)
        </button>

        <button onClick={allUserTests}  
          className='ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          All Tests
        </button>
      </div>

      <div className='p-3 mt-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>AUTH TESTS</h1>

        <button onClick={authLogin}  
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Auth Login Test
        </button>

        <button onClick={authLogout}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Auth Logout Test
        </button>

        <button onClick={refreshUserDetails}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Refresh User Details Test
        </button>

        <button onClick={getLocalUser}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          LocalStorage to Auth Test
        </button>

      </div>

      <div className='p-3 mt-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>USER TESTS</h1>

        <button onClick={showUser}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Show User Test
        </button>

        <button onClick={createUser}
          className='text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Create User Test
        </button>

        <button onClick={editUser}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Edit User Test
        </button>

        <button onClick={deleteUser}
          className='text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Remove User Test
        </button>

      </div>
    
      <div className='p-3 mt-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>CURRENT TESTS</h1>

        <button onClick={showCurrent}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Show User Test
        </button>

        <button onClick={createCurrent}
          className='text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Create Current Test
        </button>

        <button onClick={editCurrent}
          className='text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Edit Current Test
        </button>

        <button onClick={deleteCurrent}
          className='text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Remove Current Test
        </button>
      </div>
    
      <div className='p-3 mt-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>PROVINCE TESTS</h1>

        <button onClick={getProvinceList}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Get Province List Test
        </button>

        <button onClick={getDistrictList}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Get District List Test
        </button>
      </div>

      
    
    </div>

  )
}
