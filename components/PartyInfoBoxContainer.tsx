


import { PartyInfoBox } from './PartyInfoBox'
import { THost } from '@/types'

export function PartyInfoBoxContainer(props:THost[]) {


  return (
    <div className="flex justify-center items-center cursor-pointer gap-5 flex-wrap">
      <PartyInfoBox/>
      <PartyInfoBox/>
      <PartyInfoBox/>
      <PartyInfoBox/>
      <PartyInfoBox/>
      
    </div>
  )
}