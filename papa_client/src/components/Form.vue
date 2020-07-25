<template>
  <div class="form-container">
    <form>
      <div class="form-row">
        <!-- TODO maybe this should be a Component, and receive its index via props -->
        <input
          type="text"
          name="gifter"
          id="gifter-input-id"
          class="gifter-input"
          v-model="someNewGifter"
          placeholder="Add people to the roster"
        />
        <button class="gifter-add-remove-btn" id="gifter-add-btn-id" v-on:click.prevent="addEmail(someNewGifter, $event)">+</button>
      </div>
      <div class="form-row">
        <ul id="roster-ul">
          <li v-for="gifterEmail in gifterEmails" :key="gifterEmail">
            <span>{{ gifterEmail }}</span>
            <button class="gifter-add-remove-btn" id="gifter-remove-btn-id" v-on:click.prevent="removeElement(gifterEmail)">-</button>
          </li>
        </ul>
      </div>
      <div class="form-row">
        <input type="submit" class="submit-btn" id="submit-btn-id" value="Generate!" />
        <input type="reset" id="clear-roster" class="submit-btn" value="Clear" v-on:click.prevent="removeAllElements()" />
      </div>
    </form>
  </div>
</template>>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Form extends Vue {
  private gifterEmails: string[] = [];
  private someNewGifter = '';

  addEmail(email: string, event) {
    this.addElement(email);
    this.someNewGifter = '';
    event.preventDefault();
  }

  // TODO maybe a Set would be better
  addElement(gifter: string) {
    console.log(`Received gifter: ${gifter}`);
    this.gifterEmails.push(gifter);
    console.log(`Now the array is: ${this.gifterEmails}`);
  }

  removeElement(gifter: string) {
    console.log(`Will remove gifter: ${gifter}`);
    const index = this.gifterEmails.indexOf(gifter);
    if (index > -1) {
      this.gifterEmails.splice(index, 1);
    }
    console.log(`Now the array is: ${this.gifterEmails}`);
  }

  removeAllElements() {
    this.gifterEmails = [];
  }

}
</script>
