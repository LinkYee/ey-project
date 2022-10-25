import React, { useEffect } from 'react'
import MsgPopup from "./compones/msgPopup/index.tsx"
import { NotificationService } from "@xrengine/client-core/src/common/services/NotificationService";
export default function Shopify() {
  const name = window.location.pathname
  const show = name === '/location/ey'
  useEffect(() => {
    // if(localStorage.getItem('eyId')){
    //   localStorage.removeItem('eyId');
    // }
    const endTime:any = new Date('2022/10/25 14:13:00')
    
    let timeId = setInterval(() => {
      if(endTime - Date.now() <= 0){
        NotificationService.dispatchNotify("我们的活动将于14:15正式开始，请回到直播间收看", { variant: 'success' })
        clearInterval(timeId)
      }
    },1000)

  }, [])
  return <div id="eyDom" style={{display: show ? 'block' : 'none', position:'fixed',zIndex:999,width:'100vw',height:'100vh'}}>
    <MsgPopup></MsgPopup>
  </div>
}
