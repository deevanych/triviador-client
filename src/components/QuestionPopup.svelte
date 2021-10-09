<script lang="ts">
    interface QuestionAnswer {
        id: number,
        text: string,
    }

    interface Question {
        title: string,
        answers: QuestionAnswer[],
    }

    import { fade } from 'svelte/transition';
    const question: Question = {
        title: 'Сколько раз в сутки подзаводят куранты Спасской башни Кремля?',
        answers: [
            {
                id: 1,
                text: 'Один',
            },
            {
                id: 2,
                text: 'Два',
            },
            {
                id: 3,
                text: 'Три',
            },
            {
                id: 4,
                text: 'Четыре',
            },
        ]
    }
</script>

<div transition:fade="{{delay: 250, duration: 300}}"
     class="question-popup"
     on:click>
    <div class="question-popup__wrapper">
        <div class="question" transition:fade="{{delay: 500, duration: 300}}">
            <div class="question__title">
                { question.title }
            </div>
            <div class="question__answers">
                {#each question.answers as answer}
                    <div class="question__answer">{answer.text}</div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
      @keyframes sticky {
        from {width: 100%;}
        20% {width: 45%}
        to {width: 50%}
      }

    .question {
      z-index: 1;
      margin: auto;
      width: 50%;
      text-align: center;

      &__answer {
        display: block;
        text-align: center;
        padding: 1rem;
        box-shadow: 1px 3px 10px 1px #dfdfdf;
        border-radius: 2px;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          box-shadow: 1px 3px 2px 1px #dfdfdf;
        }
      }

      &__answers {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      &-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("https://sun9-67.userapi.com/impf/c844520/v844520284/3fb93/DPPj65rzqo8.jpg?size=807x471&quality=96&sign=0552c8dcf4fe4e37385f60e306bb944a&type=album");
        background-size: cover;
        overflow: hidden;

        &::after {
          animation: sticky 1.3s;
          animation-delay: 0.25s;
          position: absolute;
          right: 0;
          top: 0;
          width: 50%;
          height: 125%;
          content: "";
          background: #fff;
          display: block;
          transform: rotate(20deg) scale(1.5);
        }

        &__wrapper {
          position: absolute;
          right: 0;
          top: 0;
          width: 60%;
          height: 100%;
          display: flex;
        }
      }
    }
</style>
