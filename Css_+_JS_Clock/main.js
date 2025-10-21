const secondHand = document.querySelector(".second-hand")
const hourHand = document.querySelector('.hour-hand')
const minuteHand = document.querySelector('.min-hand')
function setDate(){
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const seconds = now.getSeconds()

    const hourDegrees = ((hour / 12) * 360) + 90
    const minuteDegrees = ((minute / 60) * 360) + 90
    const secondsDegrees = ((seconds / 60) * 360) + 90

    hourHand.style.transform = `rotate(${hourDegrees} deg)`
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`
}

setInterval(setDate, 1000)