Freenove.Initialization(DigitalPin.P0, DigitalPin.P1, DigitalPin.P2)
basic.forever(function () {
    basic.showNumber(Freenove.Thermistor(AnalogPin.P3))
    for (let index = 0; index <= 7; index++) {
        Freenove.Write_Data(Freenove.Shift_Operators(1, shift_operator.left, index), Order.MSBFIRST)
        basic.pause(500)
    }
    for (let index = 0; index <= 7; index++) {
        Freenove.Write_Data(Freenove.Shift_Operators(128, shift_operator.right, index), Order.MSBFIRST)
        basic.pause(500)
    }
    for (let index = 0; index <= 15; index++) {
        Freenove.Show_Number(index)
        basic.pause(500)
    }
})