

function TheWhy() {
  return (
    <div className="flex bg-blue-500 pr-10">
    
    <div 
    className="flex w-screen px-[170px] py-5 text-white justify-start items-center"
    >
        <div>
            <h1 className="text-[50px] w-max font-semibold text-white text-start py-5 mb-2">Why Bookley?</h1>
            <div className="flex space-y-5 w-[450px] flex-col text-start">
            <p>Bookley is the ultimate marketplace for purchasing and selling pre-loved books. 
            We cater to categories such as fiction, non-fiction, and educational materials,
             providing endless opportunities to uncover hidden gems.
             </p>
             <p>Our user-friendly platform ensures smooth and secure transactions,
             allowing book enthusiasts to expand their collections without breaking the bank.
             </p>
             <p>
             Become a part of our thriving community of bookworms and share your love for literature 
             with like-minded individuals.
             </p>
             </div>

        </div>
      </div>
      <img src='/assets/GalReading.png' alt="" className="pt-20 w-[350px] h-[350px] object-cover" />

    </div>
  )
}

export default TheWhy