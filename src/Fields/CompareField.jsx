import React, { useState } from 'react'
import Swal from 'sweetalert2'

function CompareField(props) {
    const [round, setRound] = useState(1)
    const [log, setLog] = useState([])

    const {
        compare, openFight, openCard,
        setCompare, setOpenCard, setOpenFight,
        setPlayerScore, setBotScore, deck,
        playerCard, botCard, setPlayerCard,
        setBotCard, setDeck
    } = props

    const handleOnLog = () => {
        if (log.length !== 0) {
            Swal.fire({
                title: 'Play History',
                html: log.map((data) => `<p>(${data}</p>`).join(""),
                imageUrl: "/PicDeco/log.png",
                confirmButtonText: 'Close',
            })
        } else {
            Swal.fire({
                title: 'Play History',
                text: `No data`,
                imageUrl: "/PicDeco/log.png",
                confirmButtonText: 'Close',
            })
        }

    }

    const handleOnFight = () => {
        setRound((prev) => prev + 1)
        const dataLog = `Round: ${round} | player: ${compare?.playerSelect?.cardName} | Bot: ${compare?.botSelect?.cardName}`
        setLog((prevLog) => [...prevLog, dataLog])
        setOpenCard(true)
        setTimeout(() => {
            compareCard()
            setOpenFight(false)
            setCompare({
                playerSelect: null,
                botSelect: null
            })
        }, 1200)
    }


    const compareCard = () => {
        if (compare.playerSelect.power > compare.botSelect.power) {
            Swal.fire({
                title: 'Player Win',
                text: 'Easy Game!',
                imageUrl: "/PicDeco/human.png",
                confirmButtonText: 'Continue',
            });
            setPlayerScore((prev) => prev + 1)
        } else if (compare.playerSelect.power < compare.botSelect.power) {
            Swal.fire({
                title: 'Bot Win',
                text: 'Keep fighting!',
                imageUrl: "/PicDeco/bot.png",
                confirmButtonText: 'Continue',
            });
            setBotScore((prev) => prev + 1)
        } else {
            Swal.fire({
                title: 'Draw',
                text: 'Only one can win!',
                imageUrl: "/PicDeco/draw.png",
                confirmButtonText: 'Continue',
            });
            addCard(2, deck, playerCard, botCard)
            setCompare({
                playerSelect: null,
                botSelect: null
            })
        }
    }

    const addCard = (amountOfAdd, deckInput, prevPlayerCard, prevBotCard) => {
        const newDeck = [...deckInput]
        const playerCards = [...prevPlayerCard]
        const botCards = [...prevBotCard]
        for (let i = 0; i < amountOfAdd; i++) {
            const randomIndexOfCard = Math.floor(Math.random() * newDeck.length)
            const drawnCard = newDeck.splice(randomIndexOfCard, 1)[0]
            if (drawnCard !== undefined) {
                if (i % 2 === 0) {
                    playerCards.push(drawnCard)
                } else {
                    botCards.push(drawnCard)
                }
            }
        }
        setPlayerCard(playerCards)
        setBotCard(botCards)
        setDeck(newDeck)
    }

    return (
        <div className="flex flex-col gap-14">
            <div className="flex gap-5 justify-center">
                {compare?.botSelect
                    ? openCard
                        ? <img src={compare?.botSelect?.picture} alt={compare?.botSelect?.cardName} width={100} />
                        : <img src="PNG-cards/back_card.png" alt={compare?.botSelect?.cardName} width={100} />
                    : <div className='text-white text-xl'>Waiting for bot select card.</div>
                }
            </div>
            <div className='flex flex-row gap-60 justify-center'>
                {openFight && (<button onClick={handleOnFight} className=' hover:bg-orange-500 hover:animate-bounce bg-orange-600 text-white py-2 px-5 rounded-md text-xl font-bold '>Fight</button>)}
                <button onClick={handleOnLog} className=' hover:bg-blue-500 hover:animate-bounce bg-blue-600 text-white py-2 px-5 rounded-md text-xl font-bold '>History</button>
            </div>
            <div className="flex gap-5 justify-center">
                {compare?.playerSelect
                    ? openCard
                        ? <img src={compare?.playerSelect?.picture} alt={compare?.playerSelect?.cardName} width={100} />
                        : <img src="PNG-cards/back_card.png" alt={compare?.playerSelect?.cardName} width={100} />
                    : <div className='text-white text-xl'>Waiting for player select card.</div>
                }
            </div>
        </div>
    )
}

export default CompareField