namespace PetActions {

    // ==========================
    // HELPERS
    // ==========================
    function clamp(val: number): number {
        return Math.max(0, Math.min(100, val))
    }

    // ==========================
    // EAT ACTION
    // ==========================
    /**
     * Feed the pet (returns new energy + health)
     */
    //% block="eat (energy %energy, health %health)"
    //% group="Actions"
    export function eat(energy: number, health: number): number[] {
        // animation + sound
        basic.showLeds(`
            . # # # .
            # . . . #
            # . . # #
            # . . . #
            . # # # .
        `)
        music.playTone(400, 50)
        basic.pause(100)

        basic.showLeds(`
            . # # # .
            # . . . #
            # . # . #
            # . . . #
            . # # # .
        `)
        music.playTone(250, 50)
        basic.pause(100)

        basic.showLeds(`
            . # # # .
            # . . . #
            # # . . #
            # . . . #
            . # # # .
        `)
        music.playTone(350, 50)
        basic.pause(100)

        basic.showIcon(IconNames.Happy)

        return [clamp(energy + 10), clamp(health + 5)]
    }

    // ==========================
    // SLEEP
    // ==========================
    /**
     * Sleep action (restores energy)
     */
    //% block="sleep (energy %energy)"
    //% group="Actions"
    export function sleep(energy: number): number {
        basic.showIcon(IconNames.Asleep)
        music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.InBackground)
        return clamp(energy + 15)
    }

    // ==========================
    // WAKE ANIMATION
    // ==========================
    /**
     * Wake up animation
     */
    //% block="wake animation"
    //% group="Animations"
    export function wakeAnimation() {
        basic.showLeds(`
            . . . . .
            . . . . .
            . # . # .
            . . . . .
            . . . . .
        `)
        music.playTone(200, 80)
        basic.pause(150)

        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . . . . .
            . . . . .
        `)
        music.playTone(300, 80)
        basic.pause(150)

        basic.showLeds(`
            . . . . .
            . # . # .
            . # . # .
            . . . . .
            . . . . .
        `)
        music.playTone(400, 100)
        basic.pause(150)

        basic.showIcon(IconNames.Happy)
    }

    // ==========================
    // STUDY
    // ==========================
    /**
     * Study action (costs energy, gains health)
     */
    //% block="study (energy %energy, health %health)"
    //% group="Actions"
    export function study(energy: number, health: number): number[] {
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

        return [clamp(energy - 5), clamp(health + 5)]
    }

    // ==========================
    // DANCE
    // ==========================
    /**
     * Dance action (costs energy, boosts happiness)
     */
    //% block="dance (energy %energy, happiness %happiness)"
    //% group="Actions"
    export function dance(energy: number, happiness: number): number[] {
        music.play(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.InBackground)

        basic.showIcon(IconNames.Happy)

        return [clamp(energy - 8), clamp(happiness + 10)]
    }

    // ==========================
    // PET
    // ==========================
    /**
     * Pet interaction (boost happiness + social)
     */
    //% block="pet (happiness %happiness, social %social)"
    //% group="Actions"
    export function pet(happiness: number, social: number): number[] {
        basic.showIcon(IconNames.Heart)
        music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.UntilDone)

        return [clamp(happiness + 8), clamp(social + 5)]
    }

    // ==========================
    // LOW STAT SUGGESTIONS
    // ==========================
    /**
     * Show suggestion based on stats
     */
    //% block="show suggestion energy %energy health %health happiness %happiness social %social"
    //% group="Feedback"
    export function showSuggestion(energy: number, health: number, happiness: number, social: number) {
        if (energy < 30) {
            basic.showString("SLEEP")
        } else if (health < 30) {
            basic.showString("EAT")
        } else if (happiness < 30) {
            basic.showString("PLAY")
        } else if (social < 30) {
            basic.showString("PET")
        }
    }

    // ==========================
    // ADDICTION SYSTEM
    // ==========================
    /**
     * Handle phone addiction logic
     */
    //% block="phone use time %phoneTime addiction %addiction"
    //% group="Systems"
    export function phoneUse(phoneTime: number, addiction: number): number[] {
        phoneTime += 1
        addiction += 1

        if (phoneTime >= 7) {
            basic.showString("BREAK")
            addiction += 10
        }

        return [phoneTime, addiction]
    }
}