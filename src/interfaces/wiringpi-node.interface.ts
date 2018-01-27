export interface WiringPINode {
    // Setup
    wiringPiSetup(): number;
    wiringPiSetupGpio(): number;
    wiringPiSetupPhys(): number;
    wiringPiSetupSys(): number;
    setup(mode: string): number;

    // Core functions
    pinModeAlt(pin: number, mode: number): void;
    pinMode(pin: number, mode: number): void;
    pullUpDnControl(pin: number, pud: number): void;
    digitalRead(pin: number): number;
    digitalWrite(pin: number, state: number): void;
    pwmWrite(pin: number, value: number): void;
    analogRead(pin: number): number;
    analogWrite(pin: number, value: number): void;
    pulseIn(pin: number, state: number): number;
    delay(ms: number): void;
    delayMicroseconds(us: number): void;
    millis(): number;
    micros(): number;

    // Interrupts
    wiringPiISR(pin: number, edgeType: number, callback: (delta: number) => void): void;
    wiringPiISRCancel(pin: number): void;
    INT_EDGE_FALLING: number;
    INT_EDGE_RISING: number;
    INT_EDGE_BOTH: number;
    INT_EDGE_SETUP: number;

    // Raspberry Pi hardware specific functions
    piBoardRev(): number;
    piBoardId(): PiBoardId;
    wpiPinToGpio(pin: number): number;
    physPinToGpio(pin: number): number;
    setPadDrive(group: number, value: number): void;
    getAlt(pin: number): number;
    digitalWriteByte(byte: number): void;
    pwmSetMode(mode: number): void;
    pwmSetRange(range: number): void;
    pwmSetClock(divisor: number): void;
    pwmToneWrite(pin: number, frequency: number): void;
    gpioClockSet(pin: number, frequency: number): void;

    // Constants
    // WPI_MODEs
    WPI_MODE_PINS: number;
    WPI_MODE_PHYS: number;
    WPI_MODE_GPIO: number;
    WPI_MODE_GPIO_SYS: number;
    WPI_MODE_PIFACE: number;
    WPI_MODE_UNINITIALISED: number;

    // pinMode
    INPUT: number;
    OUTPUT: number;
    PWM_OUTPUT: number;
    GPIO_CLOCK: number;
    SOFT_PWM_OUTPUT: number;
    SOFT_TONE_OUTPUT: number;

    // pullUpDnControl
    PUD_OFF: number;
    PUD_DOWN: number;
    PUD_UP: number;

    // digitalRead/Write
    HIGH: number;
    LOW: number;

    // pwmSetMode
    PWM_MODE_BAL: number;
    PWM_MODE_MS: number;

    // PiBoardId.model
    PI_MODEL_UNKNOWN: number;
    PI_MODEL_A: number;
    PI_MODEL_B: number;
    PI_MODEL_BP: number;
    PI_MODEL_CM: number;
    PI_MODEL_AP: number;
    PI_MODEL_2: number;

    // PiBoardId.rev
    PI_VERSION_UNKNOWN: number;
    PI_VERSION_1: number;
    PI_VERSION_1_1: number;
    PI_VERSION_1_2: number;
    PI_VERSION_2: number;

    // PiBoardId,marker
    PI_MAKER_UNKNOWN: number;
    PI_MAKER_EGOMAN: number;
    PI_MAKER_SONY: number;
    PI_MAKER_QISDA: number;
    PI_MAKER_MBEST: number;

    // arrays
    PI_MODEL_NAMES: string[];
    PI_REVISION_NAMES: string[];
    PI_MAKER_NAMES: string[];

    // pinModeAlt
    FSEL_INPT: number;
    FSEL_OUTP: number;
    FSEL_ALT0: number;
    FSEL_ALT1: number;
    FSEL_ALT2: number;
    FSEL_ALT3: number;
    FSEL_ALT4: number;
    FSEL_ALT5: number;

    // I2C
    wiringPiI2CSetup(devId: number): number;
    wiringPiI2CSetupInterface(device: string, devId: number): number;
    wiringPiI2CClose(fd: number): void;
    wiringPiI2CRead(fd: number): number;
    wiringPiI2CReadReg8(fd: number, reg: number): number;
    wiringPiI2CReadReg16(fd: number, reg: number): number;
    wiringPiI2CWrite(fd: number, data: number): number;
    wiringPiI2CWriteReg8(fd: number, reg: number, data: number): number;
    wiringPiI2CWriteReg16(fd: number, reg: number, data: number): number;

    // SPI
    wiringPiSPIGetFd(channel: number): number;
    wiringPiSPIDataRW(channel: number, data: Buffer): number;
    wiringPiSPISetup(channel: number, speed: number): number;
    wiringPiSPISetupMode(channel: number, speed: number, mode: number): number;
    wiringPiSPIClose(fd: number): void;

    // Serial
    serialOpen(device: string, baudrate: number): number;
    serialClose(fd: number): void;
    serialFlush(fd: number): void;
    serialPutChar(fd: number, character: number): void;
    serialPuts(fd: number, data: string): void;
    serialPrintf(fd: number, data: string): void;
    serialDataAvail(fd: number): number;
    serialGetchar(fd: number): number;

    // Shift
    shiftIn(dPin: number, cPin: number, order: number): number;
    shiftOut(dPin: number, cPin: number, order: number, value: number): void;
    LSBFIRST: number;
    MSBFIRST: number;
    // Soft  function softPwmCreate(pin: number, value: number, range: number): number;
    softPwmWrite(pin: number, value: number): void;
    softPwmStop(pin: number): void;
    // Soft Servo
    softServoWrite(pin: number, value: number): void;
    softServoSetup(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number): number;
    // Soft Tone
    softToneCreate(pin: number): number;
    softToneWrite(pin: number, frequency: number): void;
    softToneStop(pin: number): void;
    // Extentions
    // dac7678
    dac7678Setup(pinBase: number, i2cAddress: number, vrefMode: number): number;
    DAC7678_VREF_MODE_STATIC_ON: number;
    DAC7678_VREF_MODE_STATIC_OFF: number;
    DAC7678_VREF_MODE_FLEXIBLE_ON: number;
    DAC7678_VREF_MODE_FLEXIBLE_ALWAYS_ON: number;
    DAC7678_VREF_MODE_FLEXIBLE_ALWAYS_OFF: number;
    // drcSerial
    drcSerialSetup(pinBase: number, numPins: number, device: string, baudrate: number): number;
    // max31855
    max31855Setup(pinBase: number, spiChannel: number): number;
    // max5322
    max5322Setup(pinBase: number, spiChannel: number): number;
    // mcp23008
    mcp23008Setup(pinBase: number, i2cAddress: number): number;
    // mpc23016
    mpc23016Setup(pinBase: number, i2cAddress: number): number;
    // mpc23017
    mpc23017Setup(pinBase: number, i2cAddress: number): number;
    // mcp23s08
    mcp23s08Setup(pinBase: number, spiChannel: number, devId: number): number;
    // mcp23s17
    mcp23s17Setup(pinBase: number, spiChannel: number, devId: number): number;
    // mcp3002
    mcp3002Setup(pinBase: number, spiChannel: number): number;
    // mcp3004/8
    mcp3004Setup(pinBase: number, spiChannel: number): number;
    // mcp3422
    mcp3422Setup(pinBase: number, i2cAddress: number, sampleRate: number, gain: number): number;
    MCP3422_SR_3_75: number;
    MCP3422_SR_15: number;
    MCP3422_SR_60: number;
    MCP3422_SR_240: number;
    MCP3422_GAIN_1: number;
    MCP3422_GAIN_2: number;
    MCP3422_GAIN_4: number;
    MCP3422_GAIN_8: number;
    // mcp4802
    mcp4802Setup(pinBase: number, spiChannel: number): number;
    // pca9685
    pca9685Setuo(pinBase: number, i2cAddress: number, frequency: number): number;
    // pcf8574
    pcf8574Setup(pinBase: number, i2cAddress: number): number;
    // pcf8591
    pcf8591Setup(pinBase: number, i2cAddress: number): number;
    // sn3218
    sn3218Setup(pinBase: number): number;
    // sr595
    sr595Setup(pinBase: number, numPins: number, dataPin: number, clockPin: number, latchPin: number): number;
    // DevLib
    // ds1302
    ds1302setup(clockPin: number, dataPin: number, csPin: number): void;
    ds1302rtcRead(reg: number): number;
    ds1302rtcWrite(reg: number, data: number): void;
    ds1302ramRead(address: number): number;
    ds1302ramWrite(address: number, data: number): void;
    ds1302clockRead(): number[];
    ds1302clockWrite(clcokData: number[]): void;
    ds1302trickleCharge(diodes: number, resistors: number): void;
    // GertBoard
    gertboardAnalogSetup(pinBase: number): number;
    // LCD
    lcdInit(rows: number, cols: number, bits: number, rs: number, strb: number, d0: number, d1: number, d2: number, d3: number, d4: number, d5: number, d6: number, d7: number): number;
    lcdHome(fd: number): void;
    lcdClear(fd: number): void;
    lcdDisplay(fd: number, state: number): void;
    lcdCursor(fd: number, state: number): void;
    lcdCursorBlink(fd: number, state: number): void;
    lcdSendCommand(fd: number, command: number): void;
    lcdPosition(fd: number, x: number, y: number): void;
    lcdCharDef(fd: number, index: number, data: number[]): void;
    lcdPutchar(fd: number, data: number): void;
    lcdPuts(fd: number, data: string): void;
    lcdPrintf(fd: number, data: string): void;
    MAX_LCDS: number;
    // LCD 128x64
    lcd128x64setup(): number;
    lcd128x64setOrigin(x: number, y: number): void;
    lcd128x64setOrientation(orientation: number): void;
    lcd128x64orientCoordinates(): number[];
    lcd128x64getScreenSize(): number[];
    lcd128x64point(x: number, y: number, color: number): void;
    lcd128x64line(x0: number, y0: number, x1: number, y1: number, color: number): void;
    lcd128x64lineTo(x: number, y: number, color: number): void;
    lcd128x64rectangle(x1: number, y1: number, x2: number, y2: number, color: number, filled: number): void;
    lcd128x64circle(x: number, y: number, r: number, color: number, filled: number): void;
    lcd128x64ellipse(cx: number, cy: number, xRadius: number, yRadius: number, color: number, filled: number): void;
    lcd128x64putchar(x: number, y: number, c: number, bgColor: number, fgColor: number): void;
    lcd128x64puts(x: number, y: number, data: string, bgColor: number, fgColor: number): void;
    lcd128x64update(): void;
    lcd128x64clear(color: number): void;
    // cd128x64clear
    maxDetectRead(pin: number): number[];
    readRHT03(pin: number): number[];
    // piFace
    piFaceSetup(pinBase: number): number;
    // piGlow
    piGlowSetup(clear: number): void;
    piGlow1(leg: number, ring: number, intensity: number): void;
    piGlowLeg(leg: number, intensity: number): void;
    piGlowRing(ring: number, intensity: number): void;
    PIGLOW_RED: number;
    PIGLOW_YELLOW: number;
    PIGLOW_ORANGE: number;
    PIGLOW_GREEN: number;
    PIGLOW_BLUE: number;
    PIGLOW_WHITE: number;

    // pinNes
    setupNesJoystick(dPin: number, cPin: number, lPin: number): number;
    readNesJoystick(joystick: number): number;
    MAX_NES_JOYSTICKS: number;
    NES_RIGHT: number;
    NES_LEFT: number;
    NES_DOWN: number;
    NES_UP: number;
    NES_START: number;
    NES_SELECT: number;
    NES_A: number;
    NES_B: number;

    // tcs34725
    tcs34725Setup(i2cAddress: number, integrationTime: number, gain: number): number;
    tcs34725ReadRGBC(id: number): tcs34725RGBC;

    tcs34725ReadHSV(id: number): tcs34725HSV;
    tcs34725GetCorrelatedColorTemperature(r: number, g: number, b: number): void;
    tcs34725GetIlluminance(r: number, g: number, b: number): void;
    tcs34725SetInterrupt(id: number, aien: number): void;
    tcs34725ClearInterrupt(id: number): void;
    tcs34725SetInterruptLimits(id: number, low: number, high: number): void;
    tcs34725Enable(id: number): void;
    tcs34725Disable(id: number): void;
    TCS34725_ATIME_2_4MS: number;
    TCS34725_ATIME_24MS: number;
    TCS34725_ATIME_50MS: number;
    TCS34725_ATIME_101MS: number;
    TCS34725_ATIME_154MS: number;
    TCS34725_ATIME_700MS: number;
    TCS34725_GAIN_1: number;
    TCS34725_GAIN_4: number;
    TCS34725_GAIN_16: number;
    TCS34725_GAIN_60: number;
    TCS34725_MAX_TCS34725: number;
    VERSION: string;
}

export interface PiBoardId {
    model: number;
    rev: number;
    mem: number;
    maker: number;
    overvolted: number;
}

export interface tcs34725RGBC {
    r: number;
    g: number;
    b: number;
    c: number;
}

export interface tcs34725HSV {
    h: number;
    s: number;
    v: number;
}