import { useState } from 'react'
export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  
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
             <h1 className='text-3xl items-start flex justify-start font-semibold text-black  mb-2'>
                Join Us!
            </h1>
         
          <input
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
          type="username" 
          placeholder="Your Username here" 
          className="input w-[400px] input-ghost max-w-xs focus:bg-gray-200" 
          />

          <input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          type="email" 
          placeholder="www.example@gmail.com" 
          className="input w-[400px] input-ghost max-w-xs focus:bg-gray-200" 
          />


          <input 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          type="password" 
          placeholder="Your Password here" 
          className="input focus:bg-gray-200 w-[400px] input-ghost max-w-xs"
          />
        <input 
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
          type="password" 
          placeholder="Retype Your Password here" 
          className="input focus:bg-gray-200 w-[400px] input-ghost max-w-xs"
          />
          

          <button 
          type="submit"
          className="btn w-[300px]  bg-blue-500"
          >
            Sign Up
          </button>

            <p className='text-black text-sm'>Already have an account? <a href='/login' className='text-blue-500'>Login</a></p>

        

          
        </form>
      </div>
      
    </div>
  )
}
