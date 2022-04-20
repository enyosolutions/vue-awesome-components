/** list fields that will be used to format a card in the list */
export default {
  props: {
    /**
 * The fields to use to display the title
 */
    imageField: { type: String, default: '' },
    titleField: { type: String, default: '' },
    subtitleField: { type: String, default: '' },
    descriptionField: { type: String, default: '' },
    usersField: { type: String, default: '' },
    labelsField: { type: String, default: '' },
    userTitleField: { type: String, default: '' },
    userImageField: { type: String, default: '' },
  },
}