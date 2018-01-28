export interface MainConf {
    pins: {
        motors: {
            A: {
                FWD: number,
                BWD: number,
            },
            B: {
                FWD: number,
                BWD: number,
            },
            driver: number
        },
        lights: {
            A: number,
            B: number
        },
        buzzer: {
            buzzer: number
        }
    }
}
