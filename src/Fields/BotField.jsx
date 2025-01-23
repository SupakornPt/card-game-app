import React from 'react'
import pokerDeck from '../Deck/Card'

function BotField(props) {
    const { botCard, botScore } = props
    return (
        <div className='flex flex-row gap-16'>
            <div className="flex flex-row gap-5">
                {botCard.map((indexOfCard, index) => {
                    const card = pokerDeck[indexOfCard]
                    if (!card) return null
                    return <div><button key={index}><img src="PNG-cards/back_card.png" alt={card.cardName} width={100} /></button></div>
                })}
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <img src="public/PicDeco/bot.png" alt="humanPic" className='w-[120px]' />
                <div className="flex flex-row gap-2 text-xl font-bold text-white">
                    <div>Bot score :</div>
                    <div>{botScore}</div>
                </div>
            </div>

        </div>
    )
}

export default BotField