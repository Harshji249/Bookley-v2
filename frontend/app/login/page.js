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
      <div>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="bg-white text-black p-5 rounded-xl">
            <h1 className="text-4xl font-bold text-center">Hello Again!</h1>
            <h2 className="text-lg text-center">Log in to your account</h2>
            <form className="flex flex-col space-y-2" action={submitData}>
              <input
                name="username"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs"
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
  
  export default page;
  