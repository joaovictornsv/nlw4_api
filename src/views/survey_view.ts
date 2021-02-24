import Survey from "src/models/Survey"

export default {
  render(survey : Survey) {
    return {
      id: survey.id,
      title: survey.title,
      description: survey.description,
      created_at: survey.created_at
    }
  }
}
