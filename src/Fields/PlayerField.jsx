import React from 'react'
import pokerDeck from '../Deck/Card'

function PlayerField(props) {
    const {
        playerCard, playerScore, compare,
        setCompare, setPlayerCard, botCard,
        setBotCard, setOpenFight, setOpenCard
    } = props

    const handleOnSelect = (cardSelectedByPlayer) => {
        if (compare.playerSelect === null) {
            setCompare({ playerSelect: cardSelectedByPlayer })
            const updatedPlayerCards = playerCard.filter((card) => pokerDeck[card] !== cardSelectedByPlayer)
            setPlayerCard(updatedPlayerCards)
            const randomIndexLocation = Math.floor(Math.random() * botCard.length)
            const indexCardSelectedByBot = botCard[randomIndexLocation]
            setCompare({ playerSelect: cardSelectedByPlayer, botSelect: pokerDeck[indexCardSelectedByBot] })
            const updatedBotCards = botCard.filter((_, index) => index !== randomIndexLocation)
            setBotCard(updatedBotCards)
        } else {
            let currentCard = compare.playerSelect
            let cardIdx = pokerDeck.findIndex((card) => card?.cardName === currentCard.cardName)
            const addOldPlayerCards = [...playerCard,]
            addOldPlayerCards.push(cardIdx)
            setCompare(state => ({ ...state, playerSelect: cardSelectedByPlayer }))
            const newUpdatedPlayerCards = addOldPlayerCards.filter((card) => pokerDeck[card] !== cardSelectedByPlayer)
            setPlayerCard(newUpdatedPlayerCards)
        }
        setOpenFight(true)
        setOpenCard(false)
    }


    return (
        <div className='flex flex-row gap-16'>
            <div className="flex flex-row gap-5">
                {playerCard.map((indexOfCard, index) => {
                    const card = pokerDeck[indexOfCard]
                    if (!card) return null
                    return <div key={index}><button onClick={() => handleOnSelect(card)}><img src={card.picture} alt={card.cardName} width={100} /></button></div>
                })}
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <img src="public/PicDeco/human.png" alt="humanPic" className='w-[120px]' />
                <div className="flex flex-row gap-2 text-xl font-bold text-white">
                    <div>Player score :</div>
                    <div>{playerScore}</div>
                </div>
            </div>
        </div>
    )
}

export default PlayerField