

function WhyWait() {
  return (
    <div
    className="w-full overflow-x-hidden bg-blue-500 py-[100px] px-[150px] flex flex-col items-center">
        <h1 
        className="text-4xl font-semibold text-white mb-2"
        >Why wait?</h1>
        <p
        className="text-white text-center w-[500px]"
        >Join our community of book lovers today and start exploring!</p>
        <button
        onClick={()=>{window.location.href='/signup'}}
        className="bg-white hover:bg-gray-400 transition-colors duration-200 text-blue-500 px-5 py-2 rounded-lg mt-5"
        >Join Now</button>


    </div>
  )
}

export default WhyWait