import React, { useEffect, useState } from 'react' //1-引入包
import './index.css'
import { accountData } from './account'
import { getState, useHookstate } from '@xrengine/hyperflux'
import { AvatarInterface } from '@xrengine/common/src/interfaces/AvatarInterface'
import { AvatarEffectComponent } from '@xrengine/engine/src/avatar/components/AvatarEffectComponent'
import { Engine } from '@xrengine/engine/src/ecs/classes/Engine'
import { hasComponent } from '@xrengine/engine/src/ecs/functions/ComponentFunctions'
import { AvatarService, AvatarState } from '../../../../../client-core/src/user/services/AvatarService'
import { useAuthState, AuthService } from '../../../../../client-core/src/user/services/AuthService'

import CommonTip from '../commenTip'

const App = () => {
  const [aPeople, setaPeople] = useState('')
  const [selectTrue, setselectTrue] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState<any>('')

  const avatarState = useHookstate(getState(AvatarState))
  const list = avatarState.avatarList.value
  const avatarList = list.slice(0, 6)

  const [tipText, settipText] = useState<string>('')
  const [showTip, setshowTip] = useState<boolean>(false)

  const selfUser = useAuthState().user
  const userId = selfUser.id.value
  const authState = useAuthState()
    const avatarId = authState.user?.avatarId?.value
    const [peopleName, setpeopleName] = useState<string>('')

  const [emall, setEmall] = useState<string>('');
  const [showPopup, setShowPopup] = useState<Boolean>(true);
  const [nextState, setNextState] = useState<Number>(0);
  //失去焦点
  const emallBlur = (val: string) => {

  }
  const emallChange = (val: string) => {
    setEmall(val)
  }

  const submit = () => {
    console.log(emall)
    console.log(accountData)
    let pn = accountData.find(item => item.Email == emall);
    console.log(pn)
    if(!pn){
      return TipShow('您的邮箱不存在')
    }
    setNextState(1)
    setpeopleName(pn.name)
  }

  useEffect(() => {
    if (avatarList.length > 0 && selectTrue) {
      console.log('defaultPeople-----------------' + avatarList[0].name)
      // selectAvatar(avatarList[0])
    }
  }, [avatarList])

  const selectAvatar = (avatarResources: AvatarInterface) => {
    setaPeople(avatarResources.id)
    console.log(aPeople)
    setSelectedAvatar(avatarResources)
    setselectTrue(false)
    // setSelectedAvatar(avatarResources.thumbnailResource.url)
  }

  //头像保存
  const setAvatar = (avatarId: string, avatarURL: string, thumbnailURL: string) => {
    if (hasComponent(Engine.instance.currentWorld.localClientEntity, AvatarEffectComponent)) return
    if (authState.user?.value)
      AvatarService.updateUserAvatarId(authState.user.id.value!, avatarId, avatarURL, thumbnailURL)
  }

  const toYyz = () => {
    
    console.log(selectedAvatar)
    if (!selectedAvatar.id) {
      TipShow('请选择角色')
      return false
    }

    //保存用户名
    const name = peopleName.trim()
    AuthService.updateUsername(userId, name)

    //保存角色
    setAvatar(
      selectedAvatar?.id || '',
      selectedAvatar?.modelResource?.url || '',
      selectedAvatar?.thumbnailResource?.url || ''
    )

    setTimeout(() => setShowPopup(false),1200)
  }

  //tip
  const TipShow = (text: string) => {
    setshowTip(true);
    settipText(text)
    setTimeout(() => {
      setshowTip(false);
    }, 1500)
  }

  return (
    <div style={{display: showPopup ? "block" : "none"}}>
      {/* <div className="hf-block hf-one">
        <div className="hf-content">少时诵诗书所所所所所所所所所所所所所所所所所所所所</div>
      </div> */}
      {/* <div>{count}</div> 
      <button onClick={() => setCount(count + 1)}>加1</button> */}
      <div className="loginPage-boxs">
        {
          nextState === 0 ? (
            <div className="in-box">
              <div className='box-title1'>邮箱登录:</div>
              <div className='pho-login'>
                <input
                  className='login-inp'
                  placeholder='请输入邮箱'
                  onChange={(e) => {
                    emallChange(e.target.value)
                  }}
                  onBlur={(e) => {
                    emallBlur(e.target.value)
                  }}
                />
              </div>
              <div className='box-login' onClick={submit}>验证登录</div>
            </div>
          ) : (
            <div className="in-box">
              <div className='box-title1'>您好，{peopleName} 请选择角色:</div>
              <div className="role-box">
                <div className="role-list">
                  {
                    avatarList.map((i, index) => {
                      return <div key={index} className={`item ${aPeople == i.id?'actived':''}`} onClick={() => selectAvatar(i)}>
                        <img className="imgItem" src={i.thumbnailResource.url} alt="" />
                      </div>
                    })
                  }
                </div>
              </div>
              <div className='box-login' onClick={toYyz}>进入元宇宙</div>
            </div>
          )
        }
        <CommonTip tipText={tipText} showTip={showTip} />
      </div>

    </div>
  )
}
export default App