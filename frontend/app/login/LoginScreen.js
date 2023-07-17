import { useSelector, useDispatch } from "react-redux";
import {login} from './LoginSlice'

function LoginScreen({ userDetails, setUserDetails }) {
  // const submitData = async (formData) => {
  //   "use server";
  //   try {
  //     const response = await submitForm({
  //       username: formData.get("username"),
  //       password: formData.get("password"),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const dispatch = useDispatch();
  const loginUserState = useSelector((state) => state.loginUserState);
  console.log(loginUserState)

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const submitData = (e) => {
    e.preventDefault();

    const user = {
      ...userDetails
    }
    dispatch(login(user));


    setUserDetails({
      email: "",
      password: "",
    });
  };


  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white text-black p-5 rounded-xl">
          <h1 className="text-4xl font-bold text-center">Hello Again!</h1>
          <h2 className="text-lg text-center">Log in to your account</h2>
          <form className="flex flex-col space-y-2" onSubmit={submitData}>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-xs"
              value={userDetails.email}
              onChange={(e) => handleChange(e)}
            />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-xs"
              value={userDetails.password}
              onChange={(e) => handleChange(e)}
            />
            <button type="submit" className="btn bg-gray-800 text-white">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
