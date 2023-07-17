function page() {
    const submitData = async (formData) => {
      "use server";
      try {
        const response = await submitForm({
          username: formData.get("username"),
          password: formData.get("password"),
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div className="flex font-sans h-screen w-screen items-center justify-center text-black  bg-white">
        <div className=""></div>
  
        <div className="flex flex-col px-5 h-min py-7 rounded-xl shadow-md justify-center items-center">
          <h2 className="text-4xl mb-[60px] font-bold text-center">
            Welcome Back!
          </h2>
  
          <p className="text-center text-2xl font-bold mb-2">Login</p>
          <form
            className="flex flex-col space-y-4 justify-center items-center"
            action={submitData}
          >
            <input
              className="border-2 bg-slate-100 rounded-xl w-[350px] px-2 h-14 "
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="border-2 bg-slate-100 rounded-xl w-[350px] px-2 h-14 "
              type="password"
              name="password"
              placeholder="Password"
            />
            <button
              className="shadow-lg rounded-xl font-bold bg-blue-500 w-[200px] h-14 "
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default page;
  