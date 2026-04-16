/**
 * 0 = none, 1 = mild, 2 = severe
 */
/**
 * GAME
 */
// ==========================
// HELPERS
// ==========================
function clamp (val: number) {
    return Math.max(0, Math.min(100, val))
}
function getBarHeight (val: number) {
    return Math.round(val * 5 / 100)
}
// ==========================
// STUDY ANIMATION
// ==========================
function studyAnimation () {
    basic.showLeds(`
        # # # # #
        # . # . #
        # . # . #
        # . # . #
        # # # # #
        `)
    basic.pause(200)
    basic.showLeds(`
        # # # . .
        # . # . .
        # . # . .
        # . # . .
        # # # . .
        `)
    basic.pause(200)
    basic.showLeds(`
        # # # # #
        # . # . #
        # . # . #
        # . # . #
        # # # # #
        `)
    basic.pause(200)
    basic.showLeds(`
        # # # . .
        # . # . .
        # . # . .
        # . # . .
        # # # . .
        `)
    basic.pause(200)
    basic.showLeds(`
        # # # # #
        # . # . #
        # . # . #
        # . # . #
        # # # # #
        `)
    basic.clearScreen()
}
// ==========================
// MUSIC (P16)
// ==========================
roversa.onEvent(RoversaPin.P16, RoversaEvent.Click, function () {
    if (isDead || playingGame) {
        return
    }
    wakeUp()
    updateFace()
    happiness += 10
    social += 5
    if (songIndex == 0) {
        music.play(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
    } else if (songIndex == 1) {
        music.play(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.InBackground)
    } else if (songIndex == 2) {
        music.play(music.builtInPlayableMelody(Melodies.Prelude), music.PlaybackMode.InBackground)
    } else if (songIndex == 3) {
        music.play(music.builtInPlayableMelody(Melodies.Ode), music.PlaybackMode.InBackground)
    } else if (songIndex == 4) {
        music.play(music.builtInPlayableMelody(Melodies.Nyan), music.PlaybackMode.InBackground)
    }
    songIndex = (songIndex + 1) % 5
    updateStats()
})
function updateStats () {
    energy = clamp(energy)
    happiness = clamp(happiness)
    health = clamp(health)
    social = clamp(social)
    updateFace()
    checkDeath()
}
function updateFace () {
    if (isDead) {
        basic.showIcon(IconNames.Skull)
    } else if (isSleeping) {
        basic.showIcon(IconNames.Asleep)
    } else if (energy < 25) {
        basic.showIcon(IconNames.Asleep)
    } else if (happiness < 30) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.showIcon(IconNames.Happy)
    }
}
function wakeAnimation () {
    // closed eyes
    basic.showLeds(`
        . . . . .
        . . . . .
        . # . # .
        . . . . .
        . . . . .
        `)
    music.playTone(200, 80)
    basic.pause(150)
    // half open
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . . . . .
        . . . . .
        `)
    music.playTone(300, 80)
    basic.pause(150)
    // fully open
    basic.showLeds(`
        . . . . .
        . # . # .
        . # . # .
        . . . . .
        . . . . .
        `)
    music.playTone(400, 100)
    basic.pause(150)
    // happy face after waking
    basic.showIcon(IconNames.Happy)
}
function eatSound () {
    for (let index = 0; index < 4; index++) {
        music.playTone(400, 40)
        basic.pause(20)
        music.playTone(250, 40)
        basic.pause(20)
        music.playTone(350, 30)
        basic.pause(10)
    }
}
// ==========================
// SLEEP (P13)
// ==========================
roversa.onEvent(RoversaPin.P13, RoversaEvent.Click, function () {
    if (isDead || playingGame) {
        return
    }
    isSleeping = !(isSleeping)
    if (isSleeping) {
        basic.showIcon(IconNames.Asleep)
        music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.InBackground)
        phoneTime = Math.max(0, phoneTime - 5)
    } else {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
        wakeAnimation()
    }
    addiction = Math.max(0, addiction - 5)
    ignoredBreakCount = 0
})
function checkDeath () {
    if (energy <= 0 || health <= 0) {
        isDead = true
        playingGame = false
        basic.showString("GAME OVER")
    }
}
// ==========================
// STATS DISPLAY
// ==========================
input.onButtonPressed(Button.B, function () {
    if (isDead || playingGame) {
        return
    }
    basic.clearScreen()
    stats = [
    energy,
    happiness,
    health,
    social,
    phoneTime * 10
    ]
    for (let x = 0; x <= 4; x++) {
        h = getBarHeight(stats[x])
        for (let y = 0; y <= h - 1; y++) {
            led.plot(x, 4 - y)
        }
    }
    basic.pause(1500)
    basic.clearScreen()
})
// ==========================
// EAT (P14)
// ==========================
roversa.onEvent(RoversaPin.P14, RoversaEvent.Click, function () {
    if (isDead || playingGame) {
        return
    }
    wakeUp()
    updateFace()
    energy += 10
    health += 5
    // music.play(music.stringPlayable("G B A G C5 B A B ", 120), music.PlaybackMode.InBackground)
    pacmanEat()
    basic.showIcon(IconNames.Happy)
    music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.UntilDone)
    updateStats()
})
// ==========================
// PET
// ==========================
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (isDead || playingGame) {
        return
    }
    wakeUp()
    updateFace()
    happiness += 8
    social += 5
    addiction = Math.max(0, addiction - 2)
    music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.UntilDone)
    basic.showIcon(IconNames.Heart)
    roversa.turnRight(60)
    roversa.turnLeft(60)
})
function wakeUp () {
    if (isSleeping) {
        isSleeping = false
    }
}
// ==========================
// PHONE (P8)
// ==========================
roversa.onEvent(RoversaPin.P8, RoversaEvent.Click, function () {
    if (isDead) {
        return
    }
    wakeUp()
    updateFace()
    playingGame = false
    basic.clearScreen()
    if (phoneTime >= 7) {
        basic.showString("BREAK")
        ignoredBreakCount += 1
        // first time → still enforce break
        if (ignoredBreakCount < 2) {
            return
        }
        // after ignoring → addiction behavior kicks in
        addiction += 10
        // determine addiction level
        if (addiction > 40) {
            addictionLevel = 2
        } else if (addiction > 20) {
            addictionLevel = 1
        }
        // consequences while STILL allowing play
        if (addictionLevel == 1) {
            basic.showString("HOOKED")
            happiness += 0 - 2
            energy += 0 - 2
        } else if (addictionLevel == 2) {
            basic.showString("ADDICTED")
            basic.showString("CANT STOP")
            happiness += 0 - 4
            energy += 0 - 4
            social += 0 - 2
        }
    }
    phoneTime += 1
    addiction += 1
    phoneStreak += 1
    if (phoneTime <= 3) {
        happiness += 5
    } else if (phoneTime <= 6) {
        happiness += 0 - 2
        energy += 0 - 3
    }
    updateStats()
    // ONLY start game if we didn't return earlier
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
    playingGame = true
    score = 0
    obstacleX = 4
    playerY = 4
    jumpRequest = false
    gameStartTime = input.runningTime()
})
// ==========================
// STUDY (P5) OR JUMP
// ==========================
roversa.onEvent(RoversaPin.P5, RoversaEvent.Click, function () {
    if (playingGame) {
        jumpRequest = true
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.InBackground)
        return
    }
    if (isDead) {
        return
    }
    wakeUp()
    energy += 0 - 5
    happiness += 0 - 3
    health += 5
    phoneTime = Math.max(0, phoneTime - 2)
    addiction = Math.max(0, addiction - 3)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
    studyAnimation()
    updateStats()
})
// ==========================
// DANCE (P15)
// ==========================
roversa.onEvent(RoversaPin.P15, RoversaEvent.Click, function () {
    if (isDead || playingGame) {
        return
    }
    wakeUp()
    updateFace()
    energy += 0 - 8
    health += 8
    happiness += 10
    addiction = Math.max(0, addiction - 2)
    phoneTime = Math.max(0, phoneTime - 1)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.InBackground)
    roversa.forward()
    roversa.turnRight(60)
    roversa.turnLeft(60)
    roversa.left()
    roversa.forward()
    roversa.turnRight(60)
    roversa.turnLeft(60)
    roversa.left()
    roversa.forward()
    roversa.turnRight(60)
    roversa.turnLeft(60)
    roversa.left()
    roversa.forward()
    roversa.turnRight(60)
    roversa.turnLeft(60)
    roversa.left()
    updateStats()
})
// ==========================
// PACMAN EAT
// ==========================
function pacmanEat () {
    // frame 1
    basic.showLeds(`
        . # # # .
        # . . . #
        # . . # #
        # . . . #
        . # # # .
        `)
    music.playTone(400, 50)
    basic.pause(100)
    // frame 2
    basic.showLeds(`
        . # # # .
        # . . . #
        # . # . #
        # . . . #
        . # # # .
        `)
    music.playTone(250, 50)
    basic.pause(100)
    // frame 3
    basic.showLeds(`
        . # # # .
        # . . . #
        # # . . #
        # . . . #
        . # # # .
        `)
    music.playTone(350, 50)
    basic.pause(100)
    basic.clearScreen()
}
let duration = 0
let speed = 0
let gameStartTime = 0
let jumpRequest = false
let score = 0
let phoneStreak = 0
let addictionLevel = 0
let h = 0
let stats: number[] = []
let ignoredBreakCount = 0
let addiction = 0
let phoneTime = 0
let isSleeping = false
let songIndex = 0
let playingGame = false
let isDead = false
let obstacleX = 0
let playerY = 0
let social = 0
let health = 0
let happiness = 0
let energy = 0
// ==========================
// VARIABLES
// ==========================
energy = 70
happiness = 70
health = 70
social = 70
playerY = 4
obstacleX = 4
// ==========================
// MAIN LOOP
// ==========================
basic.forever(function () {
    basic.pause(15000)
    if (isDead || isSleeping || playingGame) {
        return
    }
    energy += 0 - 2
    happiness += 0 - 1
    social += 0 - 1
    phoneTime = Math.max(0, phoneTime - 1)
    // addiction slowly drains stats
    if (addictionLevel == 1) {
        happiness += 0 - 1
    } else if (addictionLevel == 2) {
        happiness += 0 - 2
        social += 0 - 2
    }
    if (energy < 30) {
        basic.showString("TRY SLEEP")
    } else if (health < 30) {
        basic.showString("TRY EAT")
    } else if (happiness < 30) {
        basic.showString("TRY MUSIC")
    } else if (social < 30) {
        basic.showString("PET ME")
    }
    updateStats()
})
basic.forever(function () {
    if (input.isGesture(Gesture.ScreenDown)) {
        music.play(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.UntilDone)
        basic.pause(2000)
    } else {
        basic.pause(50)
    }
})
// ==========================
// GAME LOOP
// ==========================
basic.forever(function () {
    if (!(playingGame)) {
        basic.pause(50)
        return
    }
    basic.clearScreen()
    led.plot(0, playerY)
    led.plot(obstacleX, 4)
    speed = Math.max(100, 300 - score * 10)
    basic.pause(speed)
    obstacleX += 0 - 1
    if (obstacleX < 0) {
        obstacleX = 4
        score += 1
    }
    // jump handling
    if (jumpRequest && playerY == 4) {
        playerY = 2
        jumpRequest = false
    }
    // gravity
    if (playerY < 4) {
        playerY += 1
    }
    // collision
    if (obstacleX == 0 && playerY == 4) {
        playingGame = false
        basic.clearScreen()
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.InBackground)
        basic.showString("SCORE")
        basic.showNumber(score)
        duration = input.runningTime() - gameStartTime
        phoneTime += Math.idiv(duration, 2000)
        // addiction consequences
        if (addiction > 20) {
            addictionLevel = 1
        }
        if (addiction > 40) {
            addictionLevel = 2
        }
        if (addictionLevel == 1) {
            happiness += 0 - 2
            energy += 0 - 2
            basic.showString("HOOKED")
        } else if (addictionLevel == 2) {
            happiness += 0 - 5
            energy += 0 - 5
            social += 0 - 3
            basic.showString("ADDICTED")
        }
        return
    }
})
