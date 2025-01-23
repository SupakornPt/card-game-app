import { useEffect, useState } from "react"
import pokerDeck from "./Deck/Card"
import CompareField from "./Fields/CompareField"
import BotField from "./Fields/BotField"
import PlayerField from "./Fields/PlayerField"
import Swal from "sweetalert2"

export default function App() {

  const [deck, setDeck] = useState([])
  const [playerCard, setPlayerCard] = useState([])
  const [playerScore, setPlayerScore] = useState(0)
  const [botCard, setBotCard] = useState([])
  const [botScore, setBotScore] = useState(0)
  const [compare, setCompare] = useState({
    playerSelect: null,
    botSelect: null
  })
  const [openStart, setOpenStart] = useState(true)
  const [openFight, setOpenFight] = useState(false)
  const [openCard, setOpenCard] = useState(false)


  const buildDeck = (amountOfCard) => {
    const deck = []
    for (let i = 0; i < amountOfCard; i++) {
      deck.push(i)
    }
    setDeck(deck)
    return deck
  }


  const drawCard = (amountOfDraw, deckInput) => {
    const newDeck = [...deckInput]
    const playerCards = []
    const botCards = []
    for (let i = 0; i < amountOfDraw; i++) {
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



  const handleOnStart = () => {
    const deckForPlay = buildDeck(pokerDeck.length)
    setPlayerScore(0)
    setBotScore(0)
    setPlayerCard([])
    setBotCard([])
    setCompare({
      playerSelect: null,
      botSelect: null
    })
    drawCard(14, deckForPlay)
    setOpenStart(false)
  }


  const checkEnd = () => {
    if (playerScore + botScore == 7) {
      if (playerScore > botScore) {
        Swal.fire({
          title: 'You Win!',
          text: `Player: ${playerScore} VS Bot: ${botScore}`,
          imageUrl: `/PicDeco/celebration.png`,
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'You Lose!',
          text: `Player: ${playerScore} VS Bot: ${botScore}`,
          imageUrl: `/PicDeco/sad.png`,
          confirmButtonText: 'OK',
        });
      }
      setOpenStart(true)
    }
  }

  useEffect(() => {
    checkEnd()
  }, [playerScore, botScore])


  return (

    <div className="flex flex-col min-h-screen justify-center items-center bg-[url('/PicDeco/bg.jpg')]  bg-center">
      {
        openStart
          ? <div className="flex flex-col gap-5 items-center">
            <img src="/PicDeco/king.png" alt="kingPic" className="w-[400px]" />
            <div className="flex flex-row gap-5">
              <img src="/PicDeco/poker.png" alt="cardPic" />
              <div className="font-bold text-5xl text-white">Welcome to card game</div>
              <img src="/PicDeco/poker.png" alt="cardPic" />
            </div>
            <button onClick={handleOnStart} className="hover:text-red-600 hover:animate-bounce font-semibold text-3xl text-white">New Game</button>
          </div>

          : <div className="flex flex-col gap-5 p-20  min-h-screen justify-between ">
            <div className="h-1/3">
              <BotField botCard={botCard} botScore={botScore} />
            </div>

            <div className="flex flex-col items-center h-1/3">
              <CompareField compare={compare} openFight={openFight} openCard={openCard}
                setCompare={setCompare} setOpenCard={setOpenCard} setOpenFight={setOpenFight}
                setPlayerScore={setPlayerScore} setBotScore={setBotScore} deck={deck}
                playerCard={playerCard} botCard={botCard} setPlayerCard={setPlayerCard}
                setBotCard={setBotCard} setDeck={setDeck}
              />
            </div>

            <div className="flex flex-row gap-5 h-1/3">
              <PlayerField
                playerCard={playerCard} playerScore={playerScore} setPlayerCard={setPlayerCard}
                compare={compare} setCompare={setCompare} botCard={botCard} setBotCard={setBotCard}
                setOpenFight={setOpenFight} setOpenCard={setOpenCard}
              />
            </div>
          </div>
      }
    </div>

  )
}


