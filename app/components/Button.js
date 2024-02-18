'use client';
import { useRouter } from 'next/navigation'


const Button = ({style = 'default', extraStyles = '', route = '', type = 'button', replace = false, onClick = ()=>{}, children}) => {
  if(style == 'default'){
    style = 'border-4 border-black bg-gray-800 rounded-full min-w-24 text-white hover:bg-gray-600 hover:border-gray-800 transition-all hover:scale-110 min-h-5 p-2 pr-3 pl-3 text-2xl'
  }
  if(style == 'submit'){
    style = 'border-2 border-green-800 bg-green-600 rounded-full min-w-12 text-black hover:bg-green-400 hover:border-green-600 transition-all hover:scale-110 min-h-5 p-1 pr-2 pl-2'
  }
  if(style == 'deny'){
    style = 'border-2 border-red-800 bg-red-600 rounded-full min-w-12 text-black hover:bg-red-400 hover:border-red-600 transition-all hover:scale-110 min-h-5 p-1 pr-2 pl-2'
  }
  if(style == 'square'){
    style = 'border-2 border-black bg-gray-800 rounded-lg min-w-12 text-white hover:bg-gray-600 hover:border-gray-800 transition-all hover:scale-110 min-h-12'
  }
  if(style == 'xs'){
    style = 'border-[3px] border-black bg-gray-800 rounded-lg min-w-8 w-8 text-white hover:bg-gray-600 hover:border-gray-800 transition-all hover:scale-110 min-h-8 h-8 p-1 pr-2 pl-2 text-md'
  }
  if(style == 'sm'){
    style = 'border-[3px] border-black bg-gray-800 rounded-full min-w-20 text-white hover:bg-gray-600 hover:border-gray-800 transition-all hover:scale-110 min-h-10 h-10 lg:h-12 p-1 pr-2 pl-2 text-xs sm:text-xs md:text-sm lg:text-md'
  }
  if(style == 'md'){
    style = 'border-4 border-black bg-gray-800 rounded-full min-w-24 text-white hover:bg-gray-600 hover:border-gray-800 transition-all hover:scale-110 min-h-5 p-2 pr-3 pl-3 text-2xl'
  }
  if(style == 'lg'){
    style = 'border-[6px] border-black bg-gray-800 rounded-full min-w-32 text-white hover:bg-gray-600 hover:border-gray-800 transition-all hover:scale-110 min-h-12 p-2 pr-4 pl-4 text-3xl'
  }
  if(style == 'xl'){
    style = 'border-8 border-black bg-gray-800 rounded-full min-w-48 text-white hover:bg-gray-600 hover:border-gray-800 transition-all hover:scale-110 min-h-22 p-2 pr-4 pl-4 text-5xl'
  }
  if(style == 'skeleton'){
    style = 'border-4 rounded-full transition-all hover:scale-110'
  }
  if(style == 'circle'){
    style = 'border-2 border-black bg-gray-800 rounded-[100%] w-9 text-white hover:bg-gray-600 hover:border-gray-800 transition-all hover:scale-110 h-9'
  }
  if(style == 'none'){
    style = '';
  }
  const router = useRouter()
  let routed = ()=>{};
  if(route.includes('/')){
    setTimeout(()=>{
      if(replace){
        routed = ()=>{router.replace(route)}
      }else{
        routed = ()=>{router.push(route)}
      }
    }, 100)
  }

  return (
    <button className={`${style} ${extraStyles}`} onClick={()=>{onClick(); routed();}} type = {type} >{children}</button>
  )
}

export default Button