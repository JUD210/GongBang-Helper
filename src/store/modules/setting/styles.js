import { rgbaToHex, rgbaToArray } from "hex-and-rgba"

export const namespaced = true

// @T apply commented styles
export const state = {
  __fontFamilies: [
    "Jeju Gothic",
    "Jeju Hallasan",
    "Jeju Myeongjo",

    "Hanna",

    "Nanum Gothic",
    "Nanum Gothic Coding",
    "Nanum Brush Script",
    "Nanum Pen Script",
    "Nanum Myeongjo",

    "KoPub Batang",

    "Noto Sans KR",

    "Arial",
    "Helvetica",
    "Helvetica Neue",
    "sans-serif",
    "Verdana",
    "Georgia",
  ],
  __fontWeights: ["normal", "bold", "bolder", "lighter"],
  __textAligns: ["center", "left", "right"],
  __borderStyles: [
    "solid",
    "dotted",
    "dashed",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
    "none",
  ],

  /*--------------------------------------------------------*/

  styleDDW: {
    "border-color": "rgba(0, 0, 0, 0.6)",
    opacityForBorder: 0.6,
    "border-style": "double",
    "border-width": "5px",
    "border-top-left-radius": "20px",
    "border-top-right-radius": "20px",
    "border-bottom-left-radius": "20px",
    "border-bottom-right-radius": "20px",

    width: "400px",
  },

  styleDDWDDayPart: {
    "background-color": "rgba(35, 35, 35, 0.95)",
    opacityForBG: 0.95,
    "border-top-left-radius": "10px",
    "border-top-right-radius": "10px",
    "border-bottom-left-radius": "0px",
    "border-bottom-right-radius": "0px",

    left: "0px",
    bottom: "0px",

    height: "130px",
    // @T add: Import provided BG Image
    // @T add: Custom Image
  },

  styleDDWDDayPartTitle: {
    "font-family": "Jeju Gothic",
    "font-size": "40px",
    "font-weight": "normal",
    "text-align": "center",
    color: "rgba(255, 255, 255, 1.0)",
    opacityForText: 1.0,

    left: "0px",
    bottom: "0px",
  },
  styleDDWDDayPartDDay: {
    "font-family": "Jeju Gothic",
    "font-size": "35px",
    "font-weight": "normal",
    "text-align": "center",
    color: "rgba(255, 74, 74, 1.0)",
    opacityForText: 1.0,

    left: "0px",
    bottom: "0px",
  },
  styleDDWDDayPartDate: {
    "font-family": "Jeju Gothic",
    "font-size": "20px",
    "font-weight": "normal",
    "text-align": "center",
    color: "rgba(255, 255, 255, 1.0)",
    opacityForText: 1.0,

    left: "0px",
    bottom: "0px",
  },

  /*--------------------------------------------------------*/

  styleDDWTimerPart: {
    "background-color": "rgba(5, 24, 36, 0.95)",
    opacityForBG: 0.95,
    "border-top-left-radius": "0px",
    "border-top-right-radius": "0px",
    "border-bottom-left-radius": "10px",
    "border-bottom-right-radius": "10px",

    height: "80px",

    left: "0px",
    bottom: "0px",
  },

  styleDDWTimerPartNumber: {
    "font-family": "Jeju Gothic",
    "font-size": "20px",
    "font-weight": "normal",
    "text-align": "center",
    color: "rgba(255, 255, 255, 1.0)",
    opacityForText: 1.0,

    "background-color": "rgba(80, 77, 77, 1.0)",
    opacityForBG: 0.7,

    "border-color": "rgba(35, 35, 35, 0.5)",
    opacityForBorder: 0.5,
    "border-style": "solid",
    "border-width": "2px",
    "border-top-left-radius": "10px",
    "border-top-right-radius": "10px",
    "border-bottom-left-radius": "10px",
    "border-bottom-right-radius": "10px",

    width: "55px",
    height: "30px",

    left: "0px",
    bottom: "0px",

    "padding-left": "5px",
    "padding-right": "5px",
    "padding-bottom": "0px",
    "padding-top": "0px",
  },
  styleDDWTimerPartNumberString: {
    "font-family": "Jeju Gothic",
    "font-size": "20px",
    "font-weight": "normal",
    "text-align": "center",
    color: "rgba(255, 255, 255, 1.0)",
    opacityForText: 1.0,

    left: "0px",
    bottom: "0px",
  },
}

/*--------------------------------------------------------*/

export const mutations = {
  UPDATE_STYLE(state, { target, attr, value }) {
    state[target][attr] = value
  },

  RESET_STYLE(state, styles) {
    for (let target in state) {
      if (target.slice(0, 2) !== "__") {
        if (state[target].constructor === Object) {
          for (let attr in state[target]) {
            if (styles[target][attr] !== undefined) {
              state[target][attr] = styles[target][attr]
            }
          }
        } else {
          // @T Continue: Styles -> exams -> ... all
          // @T ADD UNDEFINED

          if (styles[target] !== undefined) {
            state[target] = styles[target]
          }
        }
      }
    }

    // state.styleDDW = styles.styleDDW
    // state.styleDDWDDayPart = styles.styleDDWDDayPart
    // state.styleDDWDDayPartTitle = styles.styleDDWDDayPartTitle
    // state.styleDDWDDayPartDDay = styles.styleDDWDDayPartDDay
    // state.styleDDWDDayPartDate = styles.styleDDWDDayPartDate
    // state.styleDDWTimerPart = styles.styleDDWTimerPart
    // state.styleDDWTimerPartNumber = styles.styleDDWTimerPartNumber
    // state.styleDDWTimerPartNumberString = styles.styleDDWTimerPartNumberString
  },
}

export const actions = {
  updateStyle({ commit }, { target, attr, value }) {
    commit("UPDATE_STYLE", { target, attr, value })

    // console.log(`styles/UPDATE_STYLE
    // state[${target}][${attr}] = ${value}`)
  },

  resetStyles({ commit }, styles) {
    commit("RESET_STYLE", styles)

    // console.log(`styles/RESET_STYLE
    // state.styleDDW = ${styles.styleDDW}
    // state.styleDDWDDayPart = ${styles.styleDDWDDayPart}
    // state.styleDDWDDayPartTitle = ${styles.styleDDWDDayPartTitle}
    // state.styleDDWDDayPartDDay = ${styles.styleDDWDDayPartDDay}
    // state.styleDDWDDayPartDate = ${styles.styleDDWDDayPartDate}
    // state.styleDDWTimerPart = ${styles.styleDDWTimerPart}
    // state.styleDDWTimerPartNumber = ${styles.styleDDWTimerPartNumber}
    // state.styleDDWTimerPartNumberString = ${
    //   styles.styleDDWTimerPartNumberString
    // }`)
  },
}

export const getters = {
  getStyleAttr: state => (target, attr) => {
    if (
      [
        "font-size",

        "border-width",

        "border-top-left-radius",
        "border-top-right-radius",
        "border-bottom-left-radius",
        "border-bottom-right-radius",

        "left",
        "bottom",

        "width",
        "height",

        "padding-left",
        "padding-right",
        "padding-bottom",
        "padding-top",
      ].includes(attr)
    ) {
      return state[target][attr].split("px")[0]
    } else if (["color", "background-color", "border-color"].includes(attr)) {
      return rgbaToHex(rgbaToArray(state[target][attr])).slice(0, 7)
    } else if (
      ["opacityForText", "opacityForBG", "opacityForBorder"].includes(attr)
    ) {
      return Math.round(state[target][attr] * 100)
    } else {
      return state[target][attr]
    }
  },
}
