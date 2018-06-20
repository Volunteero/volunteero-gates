export default class FormController {
  /**
   * Checks if the form is valid for the submission
   * @param {Object} document
   * @param {String} formId
   * @return {Boolean}
   * @throws {Error}
   */
  static checkFormValidity(document, formId) {
    const form = document.getElementById(formId);
    console.log(form);
    if (!form) {
      const oups = 'form not found';
      console.warn(oups);
      throw new Error(oups);
    }
    return form.checkValidity();
  }
}
