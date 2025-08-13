'use client'

import { useState } from "react"

export default function Cliboard(props) {

    const [copy, setCopy] = useState('Copiar')

    const copylink = (e) => {
      navigator.clipboard.writeText(`https://piyango.es/register?r=${props.refer_code}`)
      setCopy('Copiado!')
    }

    return (
      <div onClick={copylink} className="cursor-pointer">
          <p className="font-semibold underline">{copy}</p>
      </div>
    )
}