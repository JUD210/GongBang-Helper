import Vue from "vue"
import Vuex from "vuex"

import * as uniqueId from "./modules/uniqueId"

import * as exams from "./modules/exams"
import * as format from "./modules/format"
import * as style from "./modules/style"
import * as animation from "./modules/animation"

import firebase from "firebase/app"
import "firebase/database"

import config from "./config"

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

Vue.use(Vuex)

var database = firebase.database()

export default new Vuex.Store({
  modules: {
    uniqueId,

    exams,
    format,
    style,
    animation,
  },

  actions: {
    saveWidgetData({ state, getters }) {
      console.log(getters.getWidgetData)

      database
        .ref(`${state.uniqueId.uniqueId}/d_day_widget`)
        .set(getters.getWidgetData)
        .then(() => {
          alert(
            `저장 완료! 오른쪽 URL을 복사해서 사용하시면 됩니다. : http://www.test.com/${
              state.uniqueId.uniqueId
            }`,
          )
        })
        .catch(error => {
          alert(`오류 발생! 제 연락처로 문의해주세요. ${error}`)
        })
    },
    loadWidgetData({ state, dispatch }) {
      if (!/^([a-z0-9]+)$/.test(state.uniqueId.uniqueId)) {
        alert(
          "유효한 키값이 아닙니다! 키 값을 잘못 붙여넣었는지 확인해주세요. (띄어쓰기 등)",
        )
        return 0
      }

      database
        .ref(`${state.uniqueId.uniqueId}/d_day_widget`)
        .once("value")
        .then(snapshot => {
          var newData = snapshot.val()
          dispatch("exams/resetExams", newData.exams)
          dispatch("format/resetFormat", newData.format)
          dispatch("style/resetStyle", {
            target: "title",
            style: newData.style.title,
          })
          dispatch("style/resetStyle", {
            target: "dday",
            style: newData.style.dday,
          })
          dispatch("style/resetStyle", {
            target: "date",
            style: newData.style.date,
          })
          dispatch("animation/resetAnimation", newData.animation)
        })
        .catch(err => {
          alert(`입력된 키 값과 일치하는 데이터가 없습니다!
키 값을 잘못 붙여넣었는지 확인해주세요. (띄어쓰기 등)
${state.uniqueId.uniqueId}`)
          console.log(err)
        })
    },
  },
  getters: {
    getWidgetData(state) {
      var exams = []
      for (let i in state.exams.exams) {
        exams.push({ ...state.exams.exams[i] })
      }
      return {
        exams,
        format: {
          dday: state.format.dday,
          date: state.format.date,
        },
        style: {
          title: { ...state.style.title },
          dday: { ...state.style.dday },
          date: { ...state.style.date },
        },
        animation: {
          type: state.animation.type,
          transition: state.animation.transition,
          interval: state.animation.interval,
        },
      }
    },
  },
})
