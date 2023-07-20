import { useState } from 'react'
export default function Login() {
  const [formData, setFormData] = useState({
  
    email: '',
    password: '',
  
  })
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='flex w-screen bg-white'>
      <div
      className='w-1/2 bg-blue-500 md:flex hidden'
      >

      </div>
      <div
      className='h-screen flex flex-col justify-center items-center w-1/2'
      
      >
     
        


        <form
          className='flex space-y-4 flex-col'
          onSubmit={handleSubmit}
        >
             <h1 className='text-3xl items-start flex justify-start font-semibold text-black  mb-2'>Welcome Back!</h1>
         

          <input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          type="email" 
          placeholder="www.example@gmail.com" 
          className="input bg-gray-200 w-[400px] input-ghost max-w-xs" 
          />


          <input 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          
          type="password" 
          placeholder="Your Password here" 
          className="input bg-gray-200  w-[400px] input-ghost max-w-xs"
          />

          <button 
          type="submit"
          className="btn w-[300px]  bg-blue-500"
          >
            Login
          </button>

          <p className='text-black text-sm'>Don't have an account? <a href='/signup' className='text-blue-500'>Sign up</a></p>

        

          
        </form>
      </div>
      
    </div>
  )
}
