import Survey from 'src/models/Survey'

export default {
  render (survey : Survey): Survey {
    return {
      id: survey.id,
      title: survey.title,
      description: survey.description,
      created_at: survey.created_at
    }
  },

  renderMany (surveys : Survey[]): Survey[] {
    return surveys.map(survey => this.render(survey))
  }
}
