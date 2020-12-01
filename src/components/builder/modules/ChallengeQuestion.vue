<template>
  <AwesomeBuilderModule :icon="module.icon" :title="module.title" :description="module.description">
    <template v-slot:content>
      <div class="module-challenge-question">
        <div class="challenge-question-header">
          <input v-model="question" type="text" class="form-control" placeholder="What is the correct answer ?">
        </div>
        <div class="challenge-question-content">
          <h4>Answers</h4>
          <div class="challenge-question-content-item" v-for="(_, index) in answers" :key="index">
            <input v-model="answers[index]" class="form-control" type="text">
            <button @click="deleteOption(index)" class="btn btn-simple btn-alt-style btn-sm p-2" type="button">
              <i class="fa fa-times"></i>
            </button>
          </div>
          <button @click="addOption" class="btn btn-primary challenge-question-content-button" type="button">Add option</button>
        </div>
      </div>
    </template>
  </AwesomeBuilderModule>
</template>

<script>
import AwesomeBuilderModule from '@/components/builder/AwesomeBuilderModule';

export default {
  name: 'ChallengeQuestion',
  components: {AwesomeBuilderModule},
  data: () => ({
    module: {
      icon: 'fa-question-circle',
      title: 'Challenge Question',
      description: 'Ask a question with only one correct answer.',
    },
    question: '',
    answers: ['Answer 1'],
  }),
  methods: {
    addOption() {
      this.answers.push(`Answer ${this.answers.length + 1}`);
    },
    deleteOption(index) {
      this.answers.splice(index, 1);
    }
  }
}
</script>

<style scoped lang="scss">
.module-challenge-question {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;

  .challenge-question-header {
    width: 100%;
    margin-bottom: 40px;
  }

  .challenge-question-content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    .challenge-question-content-item {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      margin-bottom: 5px;
    }
    .challenge-question-content-button {
      flex:0 0 auto;
    }
  }
}
</style>