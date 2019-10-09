//% weight=100 color=#0fbc11 icon="\uf021"
//% groups="['74HC595','7 Segment Display','Math']"
namespace Freenove {
    let DS_PIN: DigitalPin
    let ST_CP_PIN: DigitalPin
    let SH_CP_PIN: DigitalPin
    //% subcategory="Shift Out"
    //% group="74HC595"
    //% block="Initialization |DS %DS|STCP %ST_CP|SHCP %SH_CP"
    export function Initialization(DS: DigitalPin, ST_CP: DigitalPin, SH_CP: DigitalPin) {
        DS_PIN = DS
        ST_CP_PIN = ST_CP
        SH_CP_PIN = SH_CP
    }
    //% subcategory="Shift Out"
    //% group="74HC595"
    //% block="Write Data %dig|ORDER %order"
    //% dig.min=0 dig.max=255
    export function Write_Data(dig: number, order: Order) {
        pins.digitalWritePin(ST_CP_PIN, 0)
        if (order == 1) {
            for (let j = 0; j < 8; j++) {
                pins.digitalWritePin(SH_CP_PIN, 0);
                pins.digitalWritePin(DS_PIN, ((0x80 & (dig << j)) == 0x80) ? 1 : 0)
                pins.digitalWritePin(SH_CP_PIN, 1);
            }
        }
        else {
            for (let j = 0; j < 8; j++) {
                pins.digitalWritePin(SH_CP_PIN, 0);
                pins.digitalWritePin(DS_PIN, ((0x01 & (dig >> j)) == 0x01) ? 1 : 0)
                pins.digitalWritePin(SH_CP_PIN, 1);
            }
        }
        pins.digitalWritePin(ST_CP_PIN, 1)
    }
    //% subcategory="Shift Out"
    //% group="7 Segment Display"
    //% block="Show Number %dig=number"
    export function Show_Number(dig: number) {
        switch (dig){
            case 0:dig=Num.num0;break;
            case 1:  dig = Num.num1; break;
            case 2:  dig = Num.num2; break;
            case 3:  dig = Num.num3; break;
            case 4:  dig = Num.num4; break;
            case 5:  dig = Num.num5; break;
            case 6:  dig = Num.num6; break;
            case 7:  dig = Num.num7; break;
            case 8:  dig = Num.num8; break;
            case 9:  dig = Num.num9; break;
            case 10: dig = Num.numa; break;
            case 11: dig = Num.numb; break;
            case 12: dig = Num.numc; break;
            case 13: dig = Num.numd; break;
            case 14: dig = Num.nume; break;
            case 15: dig = Num.numf; break;
            }
        Write_Data(dig, Order.MSBFIRST)
    }
    //% subcategory="Shift Out"
    //% group="7 Segment Display"
    //% blockId="number" block="%dig"
    export function Number(dig: _Number):number{
        return dig
        
    }
    //% subcategory="Shift Out"
    //% group="Math"
    //% block="%number1|%shift|%number2"
    export function Shift_Operators(number1: number, shift: shift_operator, number2: number,): number {
        if (shift==1) {
            number1 = number1 << number2 
        }
        else{
            number1 = number1 >> number2
        }
        return number1
    }
    //% subcategory="Thermistor"
    //% block="temperature(C) %pin"
    export function Thermistor(pin: AnalogPin): number {
        let v = pins.analogReadPin(pin) * 3.3 / 1023
        let Rt = v / ((3.3 - v) / 10)
        let tempk = 1 / (1 / (273.15 + 25) + Math.log(Rt / 10) / 3950)
        let tempc = tempk - 273.15
        return Math.round(tempc)
    }
}

enum shift_operator{
    //% block="<<"
    left = 1,
    //% block=">>"
    right = 2,

}
enum _Number {
    //% block="0"
    num0 = 0,
    //% block="1"
    num1 = 1,
    //% block="2"
    num2 = 2,
    //% block="3"
    num3 = 3,
    //% block="4"
    num4 = 4,
    //% block="5"
    num5 = 5,
    //% block="6"
    num6 = 6,
    //% block="7"
    num7 = 7,
    //% block="8"
    num8 = 8,
    //% block="9"
    num9 = 9,
    //% block="A"
    numa = 10,
    //% block="B"
    numb = 11,
    //% block="C"
    numc = 12,
    //% block="D"
    numd = 13,
    //% block="E"
    nume = 14,
    //% block="F"
    numf = 15,
}
enum Num {
    num0 = 192,
    num1 = 249,
    num2 = 164,
    num3 = 176,
    num4 = 153,
    num5 = 146,
    num6 = 130,
    num7 = 248,
    num8 = 128,
    num9 = 144,
    numa = 136,
    numb = 131,
    numc = 198,
    numd = 161,
    nume = 134,
    numf = 142,
}
enum Order {
    //% block="MSBFIRST"
    MSBFIRST = 1,
    //% block="LSBFIRST"
    LSBFIRST = 0,
}