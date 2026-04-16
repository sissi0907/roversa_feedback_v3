"""

GAME

"""
# ==========================
# HELPERS
# ==========================
def clamp(val: number):
    return max(0, min(100, val))
def getBarHeight(val2: number):
    return Math.round(val2 * 5 / 100)
def studyAnimation():
    # open book
    basic.show_leds("""
        # . . . #
        # # . # #
        # # # # #
        # # . # #
        # . . . #
        """)
    basic.pause(200)
    # focus (center light = brain working)
    basic.show_leds("""
        . . . . .
        . # # # .
        . # . # .
        . # # # .
        . . . . .
        """)
    basic.pause(200)
    # back to book
    basic.show_leds("""
        # . . . #
        # # . # #
        # # # # #
        # # . # #
        # . . . #
        """)
    basic.pause(200)
    basic.clear_screen()
# ==========================
# MUSIC (P16)
# ==========================

def my_function():
    if False:
        pass
roversa.on_event(RoversaPin.P16, RoversaEvent.CLICK, my_function)

def updateStats():
    global energy, happiness, health, social
    energy = clamp(energy)
    happiness = clamp(happiness)
    health = clamp(health)
    social = clamp(social)
    updateFace()
def updateFace():
    if False:
        pass
    elif False:
        pass
    elif False:
        pass
    elif False:
        pass
    else:
        pass
# ==========================
# CUSTOM BUTTON (P9) → JUMP
# ==========================

def my_function2():
    if False:
        pass
roversa.on_event(RoversaPin.P9, RoversaEvent.CLICK, my_function2)

# ==========================
# SLEEP (P13)
# ==========================

def my_function3():
    if False:
        pass
roversa.on_event(RoversaPin.P13, RoversaEvent.CLICK, my_function3)

def checkDeath():
    if False:
        pass
# ==========================
# STATS DISPLAY (BUTTON B)
# ==========================

def on_button_pressed_b():
    if False:
        pass
input.on_button_pressed(Button.B, on_button_pressed_b)

# ==========================
# EAT (P14)
# ==========================

def my_function4():
    if False:
        pass
roversa.on_event(RoversaPin.P14, RoversaEvent.CLICK, my_function4)

# ==========================
# PET (LOGO)
# ==========================

def on_logo_touched():
    if False:
        pass
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

def wakeUp():
    if False:
        pass
# ==========================
# PHONE (P8)
# ==========================

def my_function5():
    if False:
        pass
roversa.on_event(RoversaPin.P8, RoversaEvent.CLICK, my_function5)

# ==========================
# STUDY (P5)
# ==========================

def my_function6():
    if False:
        pass
roversa.on_event(RoversaPin.P5, RoversaEvent.CLICK, my_function6)

# ==========================
# DANCE (P15)
# ==========================

def my_function7():
    if False:
        pass
roversa.on_event(RoversaPin.P15, RoversaEvent.CLICK, my_function7)

# ==========================
# PACMAN ANIMATION
# ==========================
def pacmanEat():
    basic.show_leds("""
        . # # # .
        # . . . #
        # . . # #
        # . . . #
        . # # # .
        """)
    basic.pause(150)
    basic.show_leds("""
        . # # # .
        # . . . #
        # . # . #
        # . . . #
        . # # # .
        """)
    basic.pause(150)
    basic.show_leds("""
        . # # # .
        # . . . #
        # # . . #
        # . . . #
        . # # # .
        """)
    basic.pause(150)
    basic.clear_screen()
social = 0
health = 0
happiness = 0
energy = 0
# ==========================
# VARIABLES
# ==========================
energy = 70
happiness = 70
health = 70
social = 70
playerY = 4
obstacleX = 4
# ==========================
# GAME LOOP
# ==========================

def on_forever():
    if False:
        pass
basic.forever(on_forever)

# ==========================
# MAIN LOOP
# ==========================

def on_forever2():
    basic.pause(15000)
    if False:
        pass
basic.forever(on_forever2)
