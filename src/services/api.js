import http from "../http-common";

class GymDataService {
  getUniqueDates(day) {
    return http.get(`/dates?day=${day}`);
  }

  getNotesInfo(day) {
    return http.get(`/notes_info?day=${day}`);
  }

  createNote(date, index, day) {
    return http.post(`/note_create?date=${date}&index=${index}&day=${day}`);
  }

  deleteNote(id, day) {
    return http.delete(`/note_delete?id=${id}&day=${day}`);
  }

  updateData(id, data, param, day) {
    return http.post(`/data_update?name=${param}&id=${id}&day=${day}`, data);
  }

  updateDate(date, newDate, day, parentId) {
    return http.post(
      `/date_update?date=${date}&day=${day}&parentId=${parentId}`,
      newDate
    );
  }

  getExercises(date, day, id) {
    return http.get(`/exercises?date=${date}&day=${day}&id=${id}`);
  }

  deleteExercise(id, day) {
    return http.delete(`/exercise_delete?id=${id}&day=${day}`);
  }

  createExercise(date, index, day, parentId) {
    return http.post(
      `/exercise_create?date=${date}&day=${day}&index=${index}&parentId=${parentId}`
    );
  }
}

export default new GymDataService();
