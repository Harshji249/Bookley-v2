
import 'animate.css'
function Banner() {
  return (
    <div
    className="flex pb-10 w-screen pt-10 h-screen pl-[150px]  text-black justify-center items-center ">
        <div 
        className="w-1/2">
        <h1
        className="animate__animated animate__fadeInLeft text-[70px] font-thin text-start w-[450px]"
        >Welcome To Bookley</h1>
        <div className="flex gap-10 pt-6 justify-start">
            <button 
            className="btn border-none w-[100px] text-white text-xs rounded-3xl  bg-blue-500">
                Shop Now
            </button>
            <button
            className="btn border-none w-[100px] text-white text-xs rounded-3xl  bg-blue-500">
                Sell Books
            </button>
        
        </div>
        </div>
        <div className="w-1/2">
            <img
            
             src="/assets/BookLover.svg" alt="" className="w-[400px] h-[400px] object-cover animate__animated animate__fadeInRight"/>
        </div>
       

        
    </div>
  )
}

export default Banner